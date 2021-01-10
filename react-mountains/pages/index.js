import Image from 'next/image'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div>
      <div className={styles.container}>

        <header className={styles.title}> Blah Blah</header>

        <Image src="/images/Layer10.png" layout='fill' objectFit='cover' style={{zIndex:'20'}} />
        <Image src="/images/Layer9.png" layout='fill' objectFit='cover' />
        <Image src="/images/Layer8.png" layout='fill' objectFit='cover' />
        <Image src="/images/Layer7.png" layout='fill' objectFit='cover' />
        
        <Image src="/images/Layer5.png" layout='fill' objectFit='cover' />
        <Image src="/images/Layer4.png" layout='fill' objectFit='cover' />
        <Image src="/images/Layer3.png" layout='fill' objectFit='cover' />
        <Image src="/images/Layer2.png" layout='fill' objectFit='cover' />
        <Image src="/images/Layer1.png" layout='fill' objectFit='cover' />
      </div>
    </div>
  )
}
