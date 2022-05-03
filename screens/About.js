import React, { Component, useState } from 'react';
import { View, Text, Image, TouchableOpacity, Alert, StyleSheet, TextInput, ScrollView, Modal } from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import data from './data';
import Icon from 'react-native-vector-icons/FontAwesome';


class About extends Component {
    constructor(props) {
        super(props);
        this.state = {
            SelectedContact: [],
            SavedContact: [],
            ContactPopup: false,
            ContactList: data
        }
    }


    selectContact(item) {
        if (!item.Choose) {
            const newArray = [...this.state.ContactList];
            const replaceArray = {
                id: item.id,
                name: item.name,
                Avatar: item.Avatar,
                Choose: !item.Choose
            };

            newArray.splice(newArray.findIndex(ele => ele.id === item.id), 1, replaceArray);
            this.setState({ ContactList: newArray });

            this.state.SelectedContact.push({
                id: item.id,
                name: item.name,
                Avatar: item.Avatar
            })
        }
        else {
            const newArray = [...this.state.ContactList];
            const replaceArray = {
                id: item.id,
                name: item.name,
                Avatar: item.Avatar,
                Choose: !item.Choose
            };
            newArray.splice(newArray.findIndex(ele => ele.id === item.id), 1, replaceArray);
            this.setState({ ContactList: newArray });

            const deleteArrayValue = [...this.state.SelectedContact];
            deleteArrayValue.splice(deleteArrayValue.findIndex(ele => ele === item.id), 1);
            this.setState({ SelectedContact: deleteArrayValue });
        }
    }

    onChoose() {
        this.setState({
            SavedContact: this.state.SelectedContact,
            ContactPopup: false
        })
    }

    render() {
        return (
           
                <ScrollView style={{ backgroundColor: '#000000' }}>
                    

                    <View style= {{marginTop: 23, alignItems:'center'}}>
                        <Text style = {{color:'#fff',fontSize: 20, fontWeight: 'bold'}}>
                            Group Members
                        </Text>
                    </View>
                    <View style={styles.selectView} />

                    {this.state.SavedContact.length > 0 ?
                        <View style={{ marginTop: 5 }}>
                            <Text style={styles.selectListTitle}>Contact List</Text>
                            <ScrollView>
                                <View style={styles.cardView}>
                                    {this.state.SavedContact.map(item => (
                                        <View style={styles.cardMain}>
                                            <Image
                                                style={styles.contImage}
                                                source={{ uri: item.Avatar }}
                                            />
                                            <Text style={styles.contName}>{item.name}</Text>
                                        </View>
                                    ))}
                                </View>
                            </ScrollView>
                        </View>
                        :
                        <Text style={styles.noContactSelected}>Ad</Text>
                    }

                    <Modal transparent={true} visible={this.state.ContactPopup}>
                        <View style={styles.modalMain}>
                            <View style={styles.modalView}>
                                <View style={styles.modalTitleView}>
                                    <View style={{ flex: 1 }}>
                                        <Text style={styles.modalTitle}>Add Contact</Text>
                                    </View>
                                    <TouchableOpacity onPress={() => this.setState({ ContactPopup: false })} >
                                        <Icon name="xmark" size={20} color="#000" />
                                    </TouchableOpacity>
                                </View>
                                {this.state.ContactList.length > 0 ?
                                    <ScrollView showsVerticalScrollIndicator={true} style={{ paddingHorizontal: 20 }}>
                                        {this.state.ContactList.map(item => {
                                            return (
                                                <View style={{ flexDirection: 'row' }}>
                                                    <CheckBox value={item.Choose} onValueChange={() => this.selectContact(item)} color="black" />
                                                    <Text style={
                                                        {
                                                            marginTop: 5,
                                                            fontSize: 15,
                                                            color: !item.Choose ? "rgba(84, 84, 84, 1)" : "black",
                                                            fontWeight: item.Choose ? "bold" : "normal"
                                                        }}
                                                    >{item.name}</Text>
                                                </View>
                                            )
                                        })}
                                    </ScrollView>
                                    :
                                    <Text>No User Found</Text>
                                }
                                <TouchableOpacity onPress={() => this.onChoose()} style={styles.chooseButton}>
                                    <Text style={styles.chooseText}>Choose</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Modal>

                    <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 15 }} >
                        <View style={styles.innerContainer}>
                            <Image
                                source={require('../assets/add.png')}
                                style={styles.image}
                            />
                            <TouchableOpacity
                                style={styles.button}
                                onPress={() => this.setState({ ContactPopup: true })}>
                                <Text style={styles.textBtn}>Add</Text>
                            </TouchableOpacity>

                        </View>

                        <View style={styles.innerContainer}>
                            <Image
                                source={require('../assets/report.png')}
                                style={styles.image}
                            />
                            <TouchableOpacity
                                style={styles.button}
                                onPress={() => Alert.alert('Report a group')}>
                                <Text style={styles.textBtn}>Report</Text>
                            </TouchableOpacity>
                        </View>



                        <View style={styles.innerContainer}>
                            <Image
                                source={require('../assets/exit.png')}
                                style={styles.image}
                            />
                            <TouchableOpacity
                                style={styles.button}
                                onPress={() => Alert.alert('Exit the group')}>
                                <Text style={styles.textBtn}>Exit</Text>
                            </TouchableOpacity>
                        </View>
                    </View>




                </ScrollView>
            
        )

    }
}

const styles = StyleSheet.create({
    center: {
        flex: 1,
        textAlign: "center",
        flexDirection: 'row',
        margin: 5,

    },
    innerContainer: {
        flex: 0.25,
        width: '90%',
        alignItems: 'center',
        justifyContent: 'center'

    },
    button: {
        padding:8,
        backgroundColor: '#8a2be2',
        borderRadius: 20,
        width: '70%'
    },

    cardMain: {
        borderRadius: 10,
        marginBottom: 15,
        marginLeft: 50,
        backgroundColor: '#000000',
        width: '90%',
        flexDirection: 'row'
    },
    contImage: {
        width: 40,
        height: 40
    },
    contName: {
        color: 'white',
        marginBottom: 5,
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 20
    },
    textBtn: {
        fontWeight: 'bold',
        fontSize: 15,
        textAlign: 'center',
        color: '#ffffff'

    },
    text: {
        color: '#ffffff',
        fontSize: 20,
        marginTop: 15
    },
    image: {
        resizeMode: 'contain',
        margin: 5,
        width: 50,
        height: 50,
        borderRadius: 100,
        marginTop:30
    },
    noContactSelected: {
        color: '#000000',
        textAlign: 'center',
        marginTop: 20,
        fontSize: 15,
        fontWeight: 'bold'
    },

    modalMain: {
        backgroundColor: 'rgba(52, 52, 52, 0.8)',
        flex: 1,
        position: 'absolute',
        left: 0, right: 0,
        top: 0, bottom: 0,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    modalTitleView: {
        padding: 10,
        borderBottomWidth: 1,
        flexDirection: "row",
        borderBottomColor: "#efefef"
    },
    modalView: {
        backgroundColor: "rgba(158, 158, 158, 1)",
        height: 'auto',
        maxHeight: '50%',
        borderRadius: 10
    },
    modalTitle: {
        fontSize: 20,
        color: '#000',
        fontWeight: 'bold'
    },

    chooseButton: {
        backgroundColor: "#8a2be2",
        padding: 8,
        marginTop: 10,
        marginBottom: 10,
        marginHorizontal: 100,
        borderRadius: 5
    },
    chooseText: {
        color: "#000",
        textAlign: "center",
        fontWeight: 'bold',
        fontSize: 15
    },
    



});

export default About;