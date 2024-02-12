import Image from 'next/image';
import MenuLink from './menuLink/menuLink';
import styles from './sidebar.module.css'
import { MdDashboard } from "react-icons/md";
const menuItems = [
  {
    title: 'Master',
    path: '/dashboard/master',
    icon: <MdDashboard />
  },
  {
    title: 'Underwriting',
    path: '/dashboard/underWriting',
    icon: <MdDashboard />
  },
  {
    title: 'Claim',
    path: '/dashboard/claim',
    icon: <MdDashboard />
  },
  {
    title: 'Reinsurance',
    path: '/dashboard/reinsurance',
    icon: <MdDashboard />
  },
  {
    title: 'Reports',
    path: '/dashboard/reports',
    icon: <MdDashboard />
  },
  {
    title: 'Finance',
    path: '/dashboard/finance',
    icon: <MdDashboard />
  },
  
]
export default function Sidebar() {
  return (
    <div className={styles.container}>
      <div className={styles.imageContainer}>
        <Image
          className={styles.image}
          src='/icon.png'
          alt=''
          width='100'
          height='60'
        />
      </div>
      <ul className={styles.list}>
        {menuItems.map(item => (
          <li key={item.title}>
            <MenuLink key={item.title} item={item} />
          </li>
        ))}
      </ul>
    </div>
  )
}
