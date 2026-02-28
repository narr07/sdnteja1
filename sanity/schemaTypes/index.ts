import { type SchemaTypeDefinition } from 'sanity'

import {blockContentType} from './blockContentType'
import {artikelType} from './artikelType'
import {guruType} from './guruType'
import {dataSekolahType} from './sekolahType'
import {kegiatanType} from './kegiatanType'
import {beritaType} from './beritaType'


export const schema: { types: SchemaTypeDefinition[] } = {
  types: [blockContentType, artikelType, guruType, dataSekolahType, kegiatanType, beritaType],
}
