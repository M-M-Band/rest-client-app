import { useTranslations } from 'next-intl';
import Link from 'next/link';

export default function Home() {
  const t = useTranslations('Main');
  return (
    <section className='home'>
      <h1 className='maintext'>
        {t.rich('title', {
          span: (chunk) => <span className='maintext_green'>{chunk}</span>,
        })}
      </h1>
      <p className='subtext'>
        {t.rich('description', {
          br: () => <br />,
        })}
      </p>
      <div className='buttons-container'>
        <Link
          href='/auth'
          className='button button_colored'
        >
          {t('signIn')}
        </Link>
        <Link
          href='/auth'
          className='button button_colored'
        >
          {t('signUp')}
        </Link>
      </div>
    </section>
  );
}
