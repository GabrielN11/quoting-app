import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { CommentaryInfo, CommentaryText, CommentaryView } from '../../screens/Commentaries/styles'
import Share from '../Share/Share'
import CommentaryOptions from './CommentaryOptions'

export default function Commentary({ commentary, navigation }) {

    function returnTime(stringDate) {
        let dateTimeParts = stringDate.split(/[- :]/)
        dateTimeParts[1]--
        const utc = Date.UTC(...dateTimeParts)
        const utcDate = new Date(utc)

        return `${utcDate.toLocaleDateString()} ${utcDate.toLocaleTimeString().substring(0, 5)}`
    }

    if(!commentary) return null

    return (
        <CommentaryView>
            <TouchableOpacity onPress={() => navigation.navigate('Profile', { profileId: commentary.user.id })}>
                <CommentaryInfo>{commentary.user.name}:</CommentaryInfo>
            </TouchableOpacity>
            <CommentaryText>
                {commentary.text}
            </CommentaryText>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <CommentaryInfo style={{ marginTop: 7, fontSize: 15 }}>
                    {returnTime(commentary.date)}
                </CommentaryInfo>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <CommentaryOptions commentary={commentary} navigation={navigation} />
                    <Share content={commentary} type='commentary' size={25} style={{marginLeft: 20}} navigation={navigation}/>
                </View>
            </View>
        </CommentaryView>
    )
}