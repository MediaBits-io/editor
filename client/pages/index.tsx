import Head from 'next/head';
import { NextPageContext } from 'next';
import { ToastProvider } from 'react-toast-notifications';
import { parseCookies } from 'nookies';
import Notification from '../components/ui/Notification/Notification';
import NotificationContainer from '../components/ui/Notification/NotificationContainer';
import { PlansContainer } from '../containers/PlansContainer';
import UniqueIdContainer from '../containers/UniqueIdContainer';
import { UserContainer } from '../containers/UserContainer';
import { VideosContainer } from '../containers/VideosContainer';
import Editor from '../features/editor/Editor';
import { AuthInfo, Plans } from '../interfaces';
import { api, getAuthHeaders } from '../utils/api';

interface Props {
  plans: Plans;
  authInfo: AuthInfo | null;
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
          content="Create engaging videos from your podcast, music and audio clips to share on social media."
        />
        <meta
          name="og:title"
          content="Mediabits.io | Turn your audio into sharable video"
        />
        <meta
          name="og:description"
          content="Create engaging videos from your podcast, music and audio clips to share on social media."
        />
        <meta
          name="og:image"
          content="https://app.mediabits.io/images/fb.png"
        />
        <link rel="manifest" href="/manifest.json" />
        <title>Mediabits.io | Turn your audio into sharable video</title>
      </Head>

      <UniqueIdContainer.Provider>
        <ToastProvider
          autoDismissTimeout={5000}
          autoDismiss
          components={{
            Toast: Notification,
            ToastContainer: NotificationContainer,
          }}
        >
          <PlansContainer.Provider initialState={{ plans }}>
            <UserContainer.Provider
              initialState={{
                user: authInfo && authInfo.user,
                plan: authInfo && authInfo.plan,
              }}
            >
              <VideosContainer.Provider>
                <Editor />
              </VideosContainer.Provider>
            </UserContainer.Provider>
          </PlansContainer.Provider>
        </ToastProvider>
      </UniqueIdContainer.Provider>
    </div>
  );
}

export async function getServerSideProps(ctx: NextPageContext) {
  const plans = await api.get<Plans>('/plans').then(({ data }) => data);

  const cookies = parseCookies(ctx);

  const authInfo = cookies.userToken
    ? await api
        .get<AuthInfo>('/me', {
          headers: await getAuthHeaders(cookies.userToken),
        })
        .then(({ data }) => data)
        .catch(() => null)
    : null;

  return {
    props: {
      plans,
      authInfo,
    },
  };
}
