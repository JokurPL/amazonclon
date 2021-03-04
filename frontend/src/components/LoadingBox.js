import { ImSpinner8 } from 'react-icons/im'

const LoadingBox = (props) => {
    return (
        <>
            <div className={`loading-div ${props.class}`} >
                <ImSpinner8 className="loading" />
            </div>
        </>
    )
}

export default LoadingBox
