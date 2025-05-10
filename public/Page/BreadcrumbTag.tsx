'use client';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import {
} from "@/components/ui/dropdown-menu"
import { Fragment } from "react";


export function BreadcrumbTag({ tags }: { tags: string }) {

  const hash = tags?.split("/");



  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>
        {hash.map((item, index) => {
          return <Fragment key={index}>
            <BreadcrumbSeparator />
            {index == hash.length - 1 && <BreadcrumbItem>
              <BreadcrumbPage >{item}</BreadcrumbPage>
            </BreadcrumbItem>}
            {
              index !== hash.length - 1 && <Fragment key={index}>
                <BreadcrumbItem>
                         
                  <BreadcrumbLink href={`/${tags.split(hash[index+1]).toString().split(',')[0]}`}>{item}</BreadcrumbLink>
                </BreadcrumbItem>
              </Fragment>
            }
          </Fragment>
        })}

      </BreadcrumbList>
    </Breadcrumb>
  )
}
