import {Alert} from "antd"
const ErrorComponent = ({error}) => {
    return(error && 
        <Alert message="Error"
        description={error}
        type="error"
        showIcon
        />

    )
}
export default ErrorComponent;