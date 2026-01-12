import { PopupProvider } from "../context/PopupContext"


type TContextProviderProps = {
    children : React.ReactNode
}
const ContextProvider = ({children} : TContextProviderProps) => {
    return(
        <PopupProvider>
            {children}
        </PopupProvider>

    )

}
export default ContextProvider