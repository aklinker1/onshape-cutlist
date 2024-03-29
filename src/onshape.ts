import { createFetch } from 'ofetch';
import * as base64 from 'base64-js';
import consola from 'consola';

export function defineOnshapeApi(config: {
  baseUrl?: string;
  auth?: {
    accessKey: string;
    secretKey: string;
  };
}) {
  const getAuthHeaders = () => {
    if (config.auth == null) return undefined;

    const encoded = base64.fromByteArray(
      Uint8Array.from(
        `${config.auth.accessKey}:${config.auth.secretKey}`
          .split('')
          .map((x) => x.charCodeAt(0)),
      ),
    );
    return {
      Authorization: `Basic ${encoded}`,
    };
  };
  const fetch = createFetch({
    defaults: {
      baseURL: config.baseUrl ?? 'https://cad.onshape.com/api/v6',
      headers: getAuthHeaders(),
      onResponseError(context) {
        consola.error(context.response._data);
      },
    },
  });

  return {
    fetch,
    getAuthHeaders,
    getDocument: async (did: string) =>
      fetch<Onshape.Document>(`/documents/${did}`),
    getAssemblies: async (did: string, wvmid: string) =>
      fetch<Onshape.Element[]>(
        `/documents/d/${did}/w/${wvmid}/elements?elementType=Assembly`,
      ),
    getAssemblyBom: async (did: string, wvmid: string, eid: string) =>
      fetch<Onshape.Bom>(
        `/assemblies/d/${did}/w/${wvmid}/e/${eid}/bom?indented=false`,
      ),
    getPartBoundingBox: async (
      did: string,
      wvm: string,
      wvmid: string,
      eid: string,
      partid: string,
    ) =>
      fetch<Onshape.BoundingBox>(
        `/parts/d/${did}/${wvm}/${wvmid}/e/${eid}/partid/${partid}/boundingboxes`,
      ),
  };
}

export type OnshapeApiClient = ReturnType<typeof defineOnshapeApi>;

export namespace Onshape {
  export interface Document {
    id: string;
    name: string;
    thumbnail: {
      href: string;
    };
    defaultWorkspace: {
      id: string;
      name: string;
    };
  }

  export interface Element {
    name: string;
    id: string;
    lengthUnits: 'inch';
    angleUnits: 'degree';
    massUnits: 'pound';
  }

  export interface Bom {
    rows: Array<{
      itemSource: {
        documentId: string;
        elementId: string;
        partId: string;
        wvmType: string;
        wvmId: string;
      };
      headerIdToValue: Record<string, unknown>;
    }>;
    headers: Array<{
      propertyName: string;
      id: string;
    }>;
  }

  export interface BoundingBox {
    lowY: number;
    lowZ: number;
    highX: number;
    highY: number;
    highZ: number;
    lowX: number;
  }
}
