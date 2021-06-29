import React from "react";
import { useEffect, useState } from "react";
import { FaGithub, FaLinkedin, FaTwitter, FaFileExcel, FaFileWord, FaFilePdf } from 'react-icons/fa'
import { IoDocumentOutline } from 'react-icons/io5'
import { TiContacts, TiMail} from 'react-icons/ti'
import { ActivityIndicator } from "react-native";
import Http, { MakeRequest } from "../../components/Http";
import validator from 'validator';
import { confirmAlert } from "react-confirm-alert";

export default function Contact() {
  const [isLoading, setLoading] = useState(true)
  const [data, setData] = useState([])
  const [lang, setLang] = useState('')

  useEffect(() => {
    const request = MakeRequest()
    Http('contact', request)
    .then((res) => {
      if (res !== undefined) {
        setData(res)
      }
    })
    .finally(() => {
      setLoading(false)
      setLang(lang)
    })
  }, [])

  function openExternal(url) {
    const isEmailAddr = validator.isEmail(url)
    const lblOK = isEmailAddr ? "Send" : "Open"

    confirmAlert({
      title: "Warning: Opening External Link",
      message: url,
      buttons: [
        {
          label: "Cancel",
        },
        {
          label: lblOK,
          onClick: () => {
            if (isEmailAddr) {
              url = `mailto:${url}`
            }
            Linking.openURL(url)
          }
        }, 
      ],
      closeOnEscape: true,
      closeOnClickOutside: true,
    })
  }

  let sns, files

  if (!isLoading && !data['is_error']) {
    sns = (
      <div className="profile-icons">
        <FaGithub onClick={ () => { openExternal(data['github']) } }/>
        <FaLinkedin onClick={ () => { openExternal(data['linkedin']) } }/>
        <FaTwitter onClick={ () => { openExternal(data['twitter']) } }/>
      </div>
    )

    files = (
      <div className="contact-icons">
        <TiMail/><a href="#" onClick={ () => { openExternal(data['email'])} }>{data['email']}</a><br/>
        <IoDocumentOutline/>CV: <FaFileWord/>/<FaFilePdf/><br/>
        <IoDocumentOutline/>履歴書: <FaFileExcel/>/<FaFilePdf/><br/>
        <IoDocumentOutline/>職務経歴書: <FaFileWord/>/<FaFilePdf/><br/>
        <TiContacts/>Contact Me
      </div>
    )
  }

  return(<div>{ isLoading 
    ? <ActivityIndicator/> 
    : <div>{sns}{files}</div>}</div>)
}