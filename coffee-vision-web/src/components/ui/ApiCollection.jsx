"use client";

import Link from "next/link";
import { http } from "@/lib/api";
import { useRemoteData } from "@/hooks/useRemoteData";
import { DataTable, PageHeader, RequestState } from "@/components/ui/PanelUI";

function recordsFrom(response) {
  if (Array.isArray(response)) return response;
  return response?.items ?? response?.results ?? response?.data ?? [];
}

export default function ApiCollection({ title, eyebrow, description, endpoint, columns, createHref, empty }) {
  const { data, loading, error, refresh } = useRemoteData(() => http.get(endpoint), [endpoint]);
  const rows = recordsFrom(data);

  return (
    <section className="page-wrap">
      <PageHeader
        eyebrow={eyebrow}
        title={title}
        description={description}
        action={createHref && <Link className="button button-primary" href={createHref}>＋ Nuevo registro</Link>}
      />
      <RequestState loading={loading} error={error} onRetry={refresh} />
      {!loading && !error && <section className="surface table-card"><DataTable columns={columns} rows={rows} empty={empty} /></section>}
    </section>
  );
}
