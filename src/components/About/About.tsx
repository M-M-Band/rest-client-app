import { useTranslations } from 'next-intl';
import Image, { StaticImageData } from 'next/image';
import Link from 'next/link';

import styles from './about.module.css';
import photo from '@/../public/photo.webp';

const { about, wrapper, img, card, mt20 } = styles;

type memberCardType = {
  name: string;
  photo: StaticImageData;
  description: string;
  teamLead?: string;
  githubLink: string;
};

const MemberCard = ({
  name,
  photo,
  description,
  teamLead,
  githubLink,
}: memberCardType) => {
  return (
    <Link
      href={githubLink}
      className={card}
    >
      <Image
        className={img}
        width={100}
        height={100}
        src={photo}
        alt={'memberPhoto'}
      />
      <h2 className={mt20}>{name}</h2>
      <h3>{`${teamLead || ''} Frontend developer`}</h3>
      <p className={`subtext ${mt20}`}>{description}</p>
    </Link>
  );
};

const About = () => {
  const t = useTranslations('about');
  return (
    <section className={about}>
      <h1 className='maintext'>{t('title')}</h1>
      <div className={`${wrapper} ${mt20}`}>
        <MemberCard
          teamLead={'Team Lead,'}
          name={t('name1')}
          photo={photo}
          description={t('description1')}
          githubLink='https://github.com/FroZe36'
        />
        <MemberCard
          name={t('name2')}
          photo={photo}
          description={t('description2')}
          githubLink='https://github.com/katiegrigoreva'
        />
        <MemberCard
          name={t('name3')}
          photo={photo}
          description={t('description3')}
          githubLink='https://github.com/AlexKabanau'
        />
      </div>
    </section>
  );
};

export default About;
