import { View, Text, ScrollView, TouchableOpacity  } from 'react-native'
import React from 'react'
import colors from '../../../../assets/constants/colors'
import GoBack from '../../../components/GoBack/GoBack'
import Empty from '../../../components/Empty/Empty'
import UserItem from '../../../components/User/UserItem'
import { API_URL } from '../../../../environment'
import { FormButton, FormBtnText } from '../../../components/Form/styles'
import { GlobalContext } from '../../../GlobalContext'
import Loading from '../../../components/Loading/Loading'
import { ReportItemButton, ReportItemData, ReportItemMain, ReportItemText, ReportItemTitle } from './styles'

export default function AdminReportList({navigation, route}) {
    const [reports, setReports] = React.useState([])
    const [page, setPage] = React.useState(0)
    const [loaded, setLoaded] = React.useState(false)
    const [loading, setLoading] = React.useState(false)

    const {user} = React.useContext(GlobalContext)
    const {type} = route.params

    React.useEffect(() => {
        getReports()
    }, [])

    async function getReports(){
        setLoading(true);
        try{
            const json = await fetch(`${API_URL}/report-${type == 'closed' ? 'closed-' : ''}list?page=${page}`, {
                headers: {
                    'Authorization': 'Bearer ' + user.token
                }
            })
            if(json.status === 200){
                const resp = await json.json()
                setReports(current => [...current, ...resp.data])
                setPage(page+1)
                if(resp.data.length < 10) setLoaded(true)
            }else if(json.status === 204){
                setLoaded(true)
            }
        }catch(e){
            console.log(e.message)
        }finally{
            setLoading(false)
        }
    }


  return (
    <ScrollView style={{backgroundColor: colors.BACKGROUND, flex: 1}}>
      <GoBack goBack={navigation.goBack}/>
      {loading && <Loading transparent/>}
      {reports.map(report => (
          <ReportItem key={report.id} id={report.id} title={report.title} date={report.date} user={report.user}
          navigation={navigation}/>
      ))}
      {reports.length > 0 && !loaded && <FormButton onPress={getReports} backgroundColor={colors.BUTTON_BACKGROUND_PRIMARY}>
            <FormBtnText>Load More...</FormBtnText>
        </FormButton>}
      {(!loading && reports.length === 0) && <Empty/>}
    </ScrollView>
  )
}

const ReportItem = ({id, title, date, user, navigation}) => {
    return (
        <ReportItemButton onPress={() => navigation.navigate('AdminReport', {reportId: id})}>
            <ReportItemMain>
                <ReportItemTitle>{title}</ReportItemTitle>
            </ReportItemMain>
            <ReportItemData>
                <ReportItemText>{date}</ReportItemText>
                <ReportItemText>Created by: {user.username}</ReportItemText>
            </ReportItemData>
        </ReportItemButton>
    )
}