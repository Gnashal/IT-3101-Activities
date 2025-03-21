import {DataTable} from 'primereact/datatable'
import { Column } from 'primereact/column'

export function PostsTable({posts}) {
    return (
    <div style={{ padding: '1rem' }}>
        <DataTable value={posts} tableStyle={{ minWidth: '50rem' }}>
            <Column field="id" header="ID" />
            <Column field="title" header="Title" />
            <Column field="content" header="Content" />
        </DataTable>
    </div>
    )
}