import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import Tooltip from 'react-native-walkthrough-tooltip';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons';
import colors from '../../../assets/constants/colors';

const CustomTooltip = ({text='Tooltip example'}) => {
    const [visible, setVisible] = React.useState(false)
    return (
        <Tooltip
            isVisible={visible}
            content={
                <Text>{text}</Text>}
            placement="bottom"
            childContentSpacing={0}
            showChildInTooltip={false}
            onClose={() => setVisible(false)}
        >
            <TouchableOpacity onPress={() => setVisible(true)}>
                <FontAwesomeIcon icon={faCircleInfo} style={{marginHorizontal: 10}} size={30} color={colors.FONT_DEFAULT_COLOR}/>
            </TouchableOpacity>
        </Tooltip>
    )
}

export default CustomTooltip