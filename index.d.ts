import * as  TransportStream from 'winston-transport';
import * as elasticsearch from 'elasticsearch';

declare namespace WinstonElasticsearch {

  export interface LogData {
    message: any;
    level: string;
    meta: { [key: string]: any };
    timestamp?: string;
  }

  export interface Transformer {
    (logData: LogData): any;
  }

  export interface ElasticsearchTransportOptions extends TransportStream.TransportStreamOptions {
    timestamp?: () => string;
    level?: string;
    index?: string;
    indexPrefix?: string;
    indexSuffixPattern?: string;
    messageType?: string;
    transformer?: Transformer;
    mappingTemplate?: { [key: string]: any };
    ensureMappingTemplate?: boolean;
    flushInterval?: number;
    waitForActiveShards?: number;
    handleExceptions?: boolean;
    pipeline?: string;
    client?: elasticsearch.Client;
    clientOpts?: elasticsearch.ConfigOptions;
  }

  export interface Elasticsearch extends TransportStream {
    new(opts?: ElasticsearchTransportOptions);

    query<T>(options: any, callback?: () => void): Promise<elasticsearch.SearchResponse<T>>;
    query<T>(q: string): Promise<elasticsearch.SearchResponse<T>>;
    getIndexName(opts: ElasticsearchTransportOptions): string;
  }
}

declare const ElasticsearchWinston: WinstonElasticsearch.Elasticsearch;
export = ElasticsearchWinston;
