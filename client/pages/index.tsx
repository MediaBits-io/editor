import Head from 'next/head';
import { NextPageContext } from 'next';
import { ToastProvider } from 'react-toast-notifications';
import { parseCookies } from 'nookies';
import Notification from '../components/ui/Notification/Notification';
import NotificationContainer from '../components/ui/Notification/NotificationContainer';
import Editor from '../features/editor/Editor';
import { AuthInfoDTO, deserializeUserPlanDTO } from '../interfaces/user';
import { api } from '../utils/api/api';
import { fetchAuthInfo } from '../utils/api/auth';
import { RecoilRoot } from 'recoil';
import { userInfoState, userPlanState } from '../state/user';
import { plansState } from '../state/plans';
import AuthController from '../components/AuthController';
import { Plans } from '../interfaces/plans';
import VideosController from '../components/VideosController';

interface Props {
  plans: Plans;
  authInfo: AuthInfoDTO | null;
}

export default function Home({ plans, authInfo }: Props) {
  return (
    <div className="h-screen flex flex-col overflow-hidden bg-gray-50">
      <Head>
        <meta charSet="utf-8" />
        <link rel="icon" href="/images/favicon.png" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#252f3f" />
        <meta
          name="description"
          content="Create engaging videos for your podcast, music and audio clips to share on social media."
        />
        <meta
          name="og:title"
          content="Mediabits.io | Turn your audio into sharable video"
        />
        <meta
          name="og:description"
          content="Create engaging videos for your podcast, music and audio clips to share on social media."
        />
        <meta
          name="og:image"
          content="https://app.mediabits.io/images/fb.png"
        />
        <link rel="manifest" href="/manifest.json" />
        <title>Mediabits.io | Turn your audio into sharable video</title>
      </Head>

      <RecoilRoot
        initializeState={({ set }) => {
          set(plansState, plans);

          if (authInfo) {
            set(userInfoState, authInfo.user);

            if (authInfo.plan) {
              set(userPlanState, deserializeUserPlanDTO(authInfo.plan));
            }
          }
        }}
      >
        <ToastProvider
          autoDismissTimeout={5000}
          autoDismiss
          components={{
            Toast: Notification,
            ToastContainer: NotificationContainer,
          }}
        >
          <AuthController />
          <VideosController />
          <Editor />
        </ToastProvider>
      </RecoilRoot>
    </div>
  );
}

export async function getServerSideProps(ctx: NextPageContext) {
  const { userToken } = parseCookies(ctx);

  const [plans, authInfo] = await Promise.all([
    api.get<Plans>('/plans').then(({ data }) => data),
    userToken ? fetchAuthInfo(userToken).catch(() => null) : null,
  ]);

  return {
    props: {
      plans,
      authInfo,
    },
  };
}
