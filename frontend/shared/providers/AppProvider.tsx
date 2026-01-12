import { DeleteEventModal } from '../../domains/event/modals/DeleteEventModal'
import { EventErrorModal } from '../../domains/event/modals/EventErrorModal'
import { SuccessCreateEventModal } from '../../domains/event/modals/SuccessCreateEventModal'
import ModelLoading from '../components/modals/LoadingModel'
import { QueryClientProviderr, ContextProvider, ToasterProvider, TrustedTypesProvider, AntdProvider } from './index'


const AppProvider = ({children}:{children: React.ReactNode}) => {
    return(
        <QueryClientProviderr>
            <TrustedTypesProvider>
                <ContextProvider>
                    <AntdProvider>
                            {children}
                            <SuccessCreateEventModal/>
                            <DeleteEventModal/>
                            <EventErrorModal/>
                            <ModelLoading />
                    </AntdProvider>
                </ContextProvider>
                <ToasterProvider/>
             </TrustedTypesProvider>
        </QueryClientProviderr>
    )
}

export default AppProvider



