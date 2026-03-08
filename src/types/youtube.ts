export interface YouTubeVideo {
    id: { videoId: string };
    snippet: {
      title: string;
      description: string;
      thumbnails: {
        medium: { url: string };
      };
      channelTitle: string;
    };
  }
  
  export interface YouTubeSearchResponse {
    items: YouTubeVideo[];
  }