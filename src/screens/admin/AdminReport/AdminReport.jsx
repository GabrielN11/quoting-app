import { ScrollView, TouchableOpacity, Alert } from 'react-native'
import React from 'react'
import colors from '../../../../assets/constants/colors'
import GoBack from '../../../components/GoBack/GoBack'
import { API_URL } from '../../../../environment'
import { GlobalContext } from '../../../GlobalContext'
import Loading from '../../../components/Loading/Loading'
import { ReportView, ReportText } from './styles'
import PublicationItem from '../../../components/Publication/PublicationItem'
import Commentary from '../../../components/Commentaries/Commentary'
import { FormBtnText, FormButton } from '../../../components/Form/styles'

export default function AdminReport({ navigation, route }) {
    const [report, setReport] = React.useState(null)
    const [closed, setClosed] = React.useState(false)
    const [loading, setLoading] = React.useState(true)

    const { user } = React.useContext(GlobalContext)
    const { reportId } = route.params

    React.useEffect(() => {
        getReport()
    }, [])

    const createAlert = (title = 'Alert Title', message = 'Alert Message') =>
        Alert.alert(
            title,
            message,
            [
                { text: "OK" }
            ]
        );

    async function getReport() {
        try {
            const json = await fetch(API_URL + '/report/' + reportId, {
                headers: {
                    'Authorization': 'Bearer ' + user.token
                }
            })
            const resp = await json.json()

            if (json.status === 200) {
                setReport(resp.data)
                setClosed(resp.data.closed)
            }
        } catch (e) {
            console.log(e.message)
        } finally {
            setLoading(false)
        }
    }

    async function alterReportState() {
        try {
            const json = await fetch(API_URL + '/report/' + reportId, {
                method: 'PUT',
                headers: {
                    'Authorization': 'Bearer ' + user.token
                }
            })
            const resp = await json.json()

            if (json.status === 200) {
                const text = resp.data ? 'closed' : 'opened'
                createAlert(`Report ${text}.`, `Report was ${text}`)
                setClosed(resp.data)
            }
        } catch (e) {

        } finally {
            setLoading(false)
        }
    }

    return (
        <ScrollView style={{ flex: 1, backgroundColor: colors.BACKGROUND }}>
            <GoBack goBack={navigation.goBack} />
            {loading && <Loading />}
            {report &&
                <ReportView>
                    <ReportText>Title: {report.title}</ReportText>
                    <ReportText>Description: {report.text}</ReportText>
                    <ReportText>Date: {report.date.split(' ')[0]}</ReportText>
                    <ReportText>Time: {report.date.split(' ')[1]}</ReportText>
                    <TouchableOpacity onPress={() => navigation.navigate('Profile', { profileId: report.user.id })}>
                        <ReportText>Reported by: {report.user.username}</ReportText>
                    </TouchableOpacity>
                   {(report.publication || report.commentary)&&<ReportText style={{ marginTop: 25, marginBottom: 0 }}>Reported {report.publication ? 'Publication' : 'Commentary'}:</ReportText>}
                    {report.publication ?
                        <PublicationItem publication={report.publication} navigation={navigation} /> :
                        <TouchableOpacity onPress={() => navigation.navigate('Publication', {publicationId: report.commentary.publication_id})}>
                            <Commentary commentary={report.commentary} />
                        </TouchableOpacity>
                    }
                    <FormButton backgroundColor={closed ? 'brown' : 'darkgreen'}
                        onPress={alterReportState}>
                        <FormBtnText>
                            {closed ? 'Open Report' : 'Close Report'}
                        </FormBtnText>
                    </FormButton>
                </ReportView>
            }
        </ScrollView>
    )
}