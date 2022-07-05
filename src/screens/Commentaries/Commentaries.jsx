import { RefreshControl } from 'react-native'
import React from 'react'
import { CommentariesView, CommentaryContainer } from './styles'
import GoBack from '../../components/GoBack/GoBack'
import { API_URL } from '../../../enviroment'
import Commentary from '../../components/Commentaries/Commentary'
import CommentaryInput from '../../components/Commentaries/CommentaryInput'
import Loading from '../../components/Loading/Loading'
import { FormBtnText, FormButton } from '../../components/Form/styles'
import colors from '../../../assets/constants/colors'
import Empty from '../../components/Empty/Empty'

export default function Commentaries({ route, navigation }) {
    const { publicationId } = route.params
    const [loading, setLoading] = React.useState(false)
    const [page, setPage] = React.useState(0)
    const [loadMore, setLoadMore] = React.useState(true)
    const [commentaries, setCommentaries] = React.useState([])
    const [refreshing, setRefreshing] = React.useState(false);

    const onRefresh = React.useCallback(async () => {
        setRefreshing(true)
        setLoadMore(true)
        setPage(0)
        setCommentaries([])
        fetchCommentaries().then(() => setRefreshing(false))
    }, []);

    async function fetchCommentaries() {
        setLoading(true)
        try {
            const json = await fetch(`${API_URL}/commentary-by-publication/${publicationId}?page=${page}`)
            const resp = await json.json()
            if (json.status === 200 && resp.data && resp.data.length > 0) {
                setCommentaries(current => [...current, ...resp.data])
                setPage(page + 1)
                if(resp.data.length < 10) setLoadMore(false)
            } else if (resp === 204) {
                setLoadMore(false)
            } else {
                console.log(resp)
            }
        } catch (e) {

        } finally {
            setLoading(false)
            return
        }
    }

    React.useEffect(() => {
        fetchCommentaries()
    }, [])
    return (
        <CommentaryContainer>
            <GoBack goBack={navigation.goBack} />
            {loading && <Loading />}
            <CommentariesView refreshControl={
                <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                />
            }>
                {commentaries.map(commentary => (
                    <Commentary key={commentary.id} commentary={commentary} navigation={navigation}/>
                ))}
                {loadMore && commentaries.length > 0 && <FormButton backgroundColor={colors.BUTTON_BACKGROUND_PRIMARY} onPress={fetchCommentaries}>
                    <FormBtnText>Load more...</FormBtnText>
                </FormButton>}
                {commentaries.length === 0 && <Empty />}
            </CommentariesView>
            <CommentaryInput publicationId={publicationId} setLoading={setLoading} setCommentaries={setCommentaries} />
        </CommentaryContainer>
    )
}