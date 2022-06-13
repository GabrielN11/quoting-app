import { View, Text, TouchableOpacity, ScrollView} from 'react-native'
import React from 'react'
import { PublicationView, PublicationWarning, PublicationText, PublicationAuthor, PublicationActions, PublicationShowMore } from './styles'
import ResetSvg from '../../../assets/reset.svg'
import { GlobalContext } from '../../GlobalContext'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faMessage } from '@fortawesome/free-solid-svg-icons'
import colors from '../../../assets/constants/colors'
import Share from '../Share/Share'
import { API_URL } from '../../../env.iroment'


export default function FeedPublication({ publication, navigation }) {

    const [text] = React.useState(publication.text)
    const [commentaryCount, setCommentaryCount] = React.useState(publication.commentaries_count)
    const [fullText, setFullText] = React.useState(false)
    const [publisher, setPublisher] = React.useState(null)
    const {user} = React.useContext(GlobalContext)

    React.useEffect(() => {
        const fetchUser = async () => {
            try{
              const json = await fetch(API_URL + '/profile/' + publication.user_id)
              const resp =  await json.json()
              if(json.status === 200){
                  setPublisher(resp.data)
              }  
            }catch(e){

            }
        }
        if(typeof publication !== 'string'){
            if(publication.userId !== user.id){
                fetchUser()
            }else{
                setPublisher(user)
            }
        }
    }, [])

    if (publication === 'reset') return (
        <PublicationView>
            <PublicationWarning>
                You have seen all publications so far. Swipe right to see them again!
            </PublicationWarning>
            <View style={{alignItems: 'center'}}>
                <ResetSvg width={250}/>
            </View>
        </PublicationView>
    )
    return (
        <PublicationView>
            <ScrollView style={{maxHeight: '70%', marginVertical: 5}}>
                <PublicationText>"{fullText ? text : text.substring(0, 250) + '...'}"</PublicationText>
                {text.length > 250 && <TouchableOpacity onPress={() => setFullText(!fullText)}>
                    <PublicationShowMore>{fullText ? 'Hide' : 'Show more'}</PublicationShowMore>
                    </TouchableOpacity>}
            </ScrollView>
            <View style={{flexDirection: 'row-reverse', justifyContent: 'space-between'}}>
                <PublicationAuthor>{publication.author ? '- ' + publication.author : ''}</PublicationAuthor>
                {publisher && <TouchableOpacity onPress={() => navigation.navigate('Profile', {profileId: publisher.id})}>
                    <PublicationAuthor>By {publisher.name}</PublicationAuthor>
                </TouchableOpacity>}
            </View>
            <PublicationActions>
                <Share content={publication} type='publication'/>
                <TouchableOpacity onPress={() => navigation.navigate('Commentaries', {publication: publication, setCommentaryCount: setCommentaryCount})}>
                    <FontAwesomeIcon icon={faMessage} color={colors.FONT_DEFAULT_COLOR} size={40}/>
                    <Text style={{textAlign: 'center', color: colors.FONT_DEFAULT_COLOR, fontSize: 18}}>
                        {commentaryCount}
                    </Text>
                </TouchableOpacity>
            </PublicationActions>
        </PublicationView>
    )
}