import { View, Text } from 'react-native'
import React from 'react'
import SubPagePopUp from '../popup/subPage/SubPagePopUp';
import { userContext } from '@/src/utils/context/ContextApi';

const SubPageWraper = ({ children }: { children: React.ReactNode }) => {
    const { isSubPagePopUpVisible, setIsSubPagePopUpVisible } = userContext();
    return (
        <View className='w-full h-full relative'>
            {isSubPagePopUpVisible.status && (
                <View className='absolute top-0 left-0 w-full h-full bg-black/60 z-10 px-4 py-10 flex items-center justify-end'>
                    <SubPagePopUp setIsSubPagePopUpVisible={setIsSubPagePopUpVisible} />
                </View>
            )}
            {children}
        </View>
    )
}

export default SubPageWraper