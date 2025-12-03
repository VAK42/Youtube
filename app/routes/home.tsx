import { getVideos } from '../models/video.server';
import { VideoCard } from '../components/VideoCard';
import { FixedSizeGrid as Grid } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';
import type { Route } from './+types/home';
export function meta({ }: Route.MetaArgs) {
  return [{ title: "Home - Youtube" }];
}
export async function loader() {
  const videos = getVideos(100);
  return { videos };
}
export default function Home({ loaderData }: Route.ComponentProps) {
  const { videos } = loaderData;
  const gutterSize = 16;
  const columnWidth = 320;
  const rowHeight = 300;
  return (
    <div className="h-[calc(100vh-3.5rem)] w-full p-4">
      <AutoSizer>
        {({ height, width }: { height: number, width: number }) => {
          const columnCount = Math.floor(width / (columnWidth + gutterSize));
          const rowCount = Math.ceil(videos.length / columnCount);
          const Cell = ({ columnIndex, rowIndex, style }: any) => {
            const index = rowIndex * columnCount + columnIndex;
            const video = videos[index];
            if (!video) return null;
            return (
              <div style={{
                ...style,
                left: (style.left as number) + gutterSize,
                top: (style.top as number) + gutterSize,
                width: (style.width as number) - gutterSize,
                height: (style.height as number) - gutterSize
              }}>
                <VideoCard video={video} />
              </div>
            );
          };
          return (
            <Grid
              columnCount={columnCount}
              columnWidth={(width - gutterSize) / columnCount}
              height={height}
              rowCount={rowCount}
              rowHeight={rowHeight}
              width={width}
            >
              {Cell}
            </Grid>
          );
        }}
      </AutoSizer>
    </div>
  )
}