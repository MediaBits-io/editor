import Head from 'next/head';
import { ToastProvider } from 'react-toast-notifications';
import Notification from '../components/ui/Notification/Notification';
import NotificationContainer from '../components/ui/Notification/NotificationContainer';
import { FontsContainer } from '../containers/FontsContainer';
import UniqueIdContainer from '../containers/UniqueIdContainer';
import { VideosContainer } from '../containers/VideosContainer';
import Editor from '../features/editor/Editor';

export default function Home() {
  return (
    <div className="h-screen flex flex-col overflow-hidden bg-gray-50">
      <Head>
        <meta charSet="utf-8" />
        <link rel="icon" href="/images/favicon.png" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#252f3f" />
        <meta
          name="description"
          content="Generate custom videos from your podcast, music and audio clips to share on social media."
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
          <VideosContainer.Provider>
            <FontsContainer.Provider>
              <Editor />
            </FontsContainer.Provider>
          </VideosContainer.Provider>
        </ToastProvider>
      </UniqueIdContainer.Provider>
    </div>
  );
}
