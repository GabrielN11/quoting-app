import { View, Modal } from 'react-native'
import {FormBtnText, FormButton} from '../Form/styles'
import React from 'react'
import { TutorialContainer, TutorialTitle, TutorialView, TutorialText, TutorialImage, ImageContainer } from './styles';
import Swiper from 'react-native-swiper';

import Tutorial1 from '../../../assets/tutorial1.jpeg'
import Tutorial2 from '../../../assets/tutorial2.jpeg'
import Tutorial3 from '../../../assets/tutorial3.jpeg'
import Tutorial4 from '../../../assets/tutorial4.jpeg'
import Tutorial5 from '../../../assets/tutorial5.jpeg'
import Tutorial6 from '../../../assets/tutorial6.jpeg'
import colors from '../../../assets/constants/colors';

export default function Tutorial({setShowTutorial}) {
    const [modalVisible, setModalVisible] = React.useState(true);
    return (
        <Modal
            animationType="slide"
            transparent
            visible={modalVisible}
            onRequestClose={() => {
                setModalVisible(!modalVisible);
            }}
        >
            <TutorialContainer>
                <TutorialView>
                    <TutorialTitle>Tutorial</TutorialTitle>
                    <Swiper loop={false} showsButtons showsPagination={false}>
                        <TutorialItem text='Welcome to Quoting! Now that you have an account, you can see others publications by swiping right in the feed. 
                        A new random quote will be loaded everytime will swipe right.' image={Tutorial1}/>
                        <TutorialItem text='You can favorite others publications and commentaries by clicking in the heart icon. 
                        Your favorites will be saved in your profile.' image={Tutorial2}/>
                        <TutorialItem text="You can leave commentaries in any publication you want to. 
                        Click in the 'message icon' below a publication to leave a commentary and see other's commentaries." image={Tutorial3}/>
                        <TutorialItem text="To publish your quotes, simple click in the 'plus icon' at the home page and you're ready to go! 
                        You can also inform an author if the quote isn't yours." image={Tutorial4}/>
                        <TutorialItem text="Click in the 'hamburger icon' at the top right to open the menu. 
                        Here you can visit your profile, the settings menu, where you can alter your preferences and also log-out." image={Tutorial5}/>
                        <TutorialItem text="You can manage your publications by clicking in the 'gear icon' at the bottom of your publication. 
                        Edit, delete or pin your favorite publication to diplay in your profile to others!" image={Tutorial6}/>
                        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                            <TutorialText>
                                Now you're ready to start Quoting!
                            </TutorialText>
                            <FormButton backgroundColor={colors.BUTTON_BACKGROUND_PRIMARY}
                            onPress={() => {
                                setModalVisible(false)
                                setShowTutorial(false)
                            }}>
                                <FormBtnText>Close tutorial</FormBtnText>
                            </FormButton>
                        </View>
                    </Swiper>
                </TutorialView>
            </TutorialContainer>
        </Modal>
    )
}

const TutorialItem = ({ text, image }) => {
    return (
        <View style={{ flex: 1 }}>
            <TutorialText>{text}</TutorialText>
            <ImageContainer>
                <TutorialImage source={image} />
            </ImageContainer>
        </View>
    )
}