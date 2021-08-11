import * as XLSX from "xlsx"
import { Component, Fragment } from "react"
import mime from "mime-types"
import firebase from "../firebase"
import {getBlob, uploadFileToFirestore} from "../actions/firebaseapi"
class UploadFiles extends Component{
    state = {
        data: "",
        file: null,
        percentUploaded : 0,
        uploadTask: null
    }
    componentWillUnmount(){
        if (this.state.uploadTask !== null) {
            this.state.uploadTask.cancel();
            this.setState({ uploadTask: null });
          }
    }
    addFile = (event) => {
        const file = event.target.files[0];
        if (file) {
            console.log(file)
          this.setState({file})
        }
      };
    isAuthorized = (filename) => {
          let authorized = ["application/vnd.openxmlformats-officedocument.spreadsheetml.sheet","application/vnd.ms-excel"]
          console.log(mime.lookup(filename))
        return authorized.includes(mime.lookup(filename));
      };
    sendFile = () =>{
        const {file} = this.state;
          if(file!=null){
              this.createExcel(file)
            // if (this.isAuthorized(file.name)) {
            //     const metadata = { contentType: mime.lookup(file.name) };
            //     console.log("metadaat",metadata)
            //     this.uploadFile(file, metadata);
            //     this.setState({file: null})
            //   }
          }
      }
    uploadFile = (file,metadata) => {
          const ref = firebase.database().ref("files")
          const filepath = `${file.name}`
          this.setState({uploadTask :firebase.storage().ref("files").child(filepath).put(file,metadata)},
          () => {
            this.state.uploadTask.on("state_changed",(snap) => {
                const percentUploaded = Math.round(
                    (snap.bytesTransferred/snap.totalBytes)*100
                )
                this.setState({percentUploaded})
              },(err) => {
                  console.log(err)
              },() => {
                this.state.uploadTask.snapshot.ref
                .getDownloadURL()
                .then((downloadURL) => {
                    console.log(downloadURL)
                    ref.child("datasheet").child("diagonstic_laboratory").set({
                        url : downloadURL
                    })
                }).catch((err)=> {
                    console.log(err)
                })
              })
        }
          )
          

      }
      getdata = () => {
    //   const fileName = firebase.database().ref("files").child("datasheet").child("url").once("value",(snap)=> {
    //      getBlob(snap.val()).then((blob) => {
    //         this.createExcel(blob)
    //      })
        
    //   })
    firebase.database().ref("jsonfiles").child("states").once("value",(snap)=>{
        this.setState({data: snap.val()})
        console.log(snap.val())
    })
    }
    createExcel = (fileName) => {
        const promise = new Promise((resolve,reject)=> {
            const fileReader = new FileReader();
            fileReader.readAsArrayBuffer(fileName)
            fileReader.onload = (e) =>{
                const bufferArray = e.target.result;

                const wb = XLSX.read(bufferArray,{type: 'buffer'});
                const wsname = wb.SheetNames[0];
                const ws = wb.Sheets[wsname];
                const data = XLSX.utils.sheet_to_json(ws);
                resolve(data);
            }
            fileReader.onerror = ((error) => {
                reject(error);
            })
        })
        
        promise.then((d) => {
            // firebase.database().ref("jsonfiles").child("GUJARAT").set(d).then(() => {
            //     console.log("done")
            // })
            uploadFileToFirestore(d);
            this.setState({file: null})
            // this.setState({data:d})
            console.log("done",d)
        })
    }
    render(){
    return (
        <Fragment>
        <input type="file" onChange={this.addFile} />
            <button onClick={this.sendFile}>Upload</button>
        <button onClick={this.getdata}>getData</button>
        </Fragment>
    )
    }
}
export default UploadFiles;