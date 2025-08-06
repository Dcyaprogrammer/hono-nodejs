# Basic Structure
```mermaid
graph LR;
A[User] --> B[API];
B --> C[文档管理];
B --> D[检索];
C --> E[Elasticsearch-元数据];
D --> F[LLM RAG];
F --> G[Elasticsearch-向量 + text]
G --> F
F --> D
E --> H[DataBase]
G --> H

```

# Meta Data

## DocumentMetadata 

    doc_id : string; 

    filename : string;

    upload_time : Date;

    custom_metadata: {[key: string]: string | number};

## ChunkMetaData

    chunck_id: string;

    doc_id: string;

    page_number: number;

    start_line: number;

    end_line: number;

    custom_metadata: { ... };  potential inheretance here


