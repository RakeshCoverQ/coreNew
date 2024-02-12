"use client"
import { Tooltip, Avatar, Popover } from 'antd';
import styles from './navbar.module.css'
import { FaUserTie, FaUser } from "react-icons/fa";
import { IoIosNotifications } from "react-icons/io";
import { RiEnglishInput } from "react-icons/ri";
import { TbWorld } from "react-icons/tb";
import { MdLogout } from "react-icons/md";

import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

export default function Navbar() {
  const router = useRouter()
  const languageIconContainer = {
    width: 30,
    height: 30,
    borderRadius: 30 / 2,
    borderWidth: 1,
    // backgroundColor: 'red',
    marginRight: 10,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  }
  const language = (
    <div>
      <p><RiEnglishInput />   English</p>
      <p>African</p>
    </div>
  );
  const handleProfileClick = () => {

  }
  const handleLogOutClick = () => {
    Cookies.set("loggedin",false)
    router.push('/')
  }
  const profile = (
    <div className={styles.profilePopOverContainer}>
      <div
        onClick={handleProfileClick}
        className={styles.profilePopOverItemContainer}>
        <span className={styles.profilePopOverItemIconContainer}>
          <FaUser />
        </span>
        <h3 className={styles.profilePopOverItemName}>Profile</h3>
      </div>
      <div
        onClick={handleLogOutClick}
        className={styles.profilePopOverItemContainer}>
        <span className={styles.profilePopOverItemIconContainer}>
          <MdLogout />
        </span>
        <h3 className={styles.profilePopOverItemName}>Logout</h3>
      </div>
    </div>
  );
  const notification = (
    <div>
      <p>Content</p>
      <p>Content</p>
    </div>
  );
  return (
    <div className={styles.container}>
      <div></div>
      <div className={styles.itemContainer}>
        <Popover content={language} title="Select language" placement="bottomRight">
          <div style={languageIconContainer}>
            <TbWorld size={25} />
          </div>
        </Popover>
        <Popover content={notification} title="Notifications" placement="bottomRight">
          <IoIosNotifications size={30} />
        </Popover>
        <Popover content={profile} placement="bottomRight">
          <div className={styles.userImageContainer}>
            <FaUserTie size={'1.5em'} />
          </div>
        </Popover>


      </div>
    </div>
  )
}
