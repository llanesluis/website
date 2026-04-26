import * as React from "react";
import { Image as FumadocsImage } from "fumadocs-core/framework";
import FumadocsLink from "fumadocs-core/link";

import { FramedImage, IframeEmbed, YouTubeEmbed } from "@/components/embed-components";
import { mdxCodeComponents } from "@/components/mdx-code-components";
import { SharePageMenu } from "@/components/share-page-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
//Registry components
import { InlineHint } from "@/registry/bases/radix/ui/pro-application/inline-hint";

export const mdxComponents = {
  h1: ({ className, ...props }: React.ComponentProps<"h1">) => (
    <h1 className={cn("", className)} {...props} />
  ),
  h2: ({ className, ...props }: React.ComponentProps<"h2">) => {
    const id = props.children
      ?.toString()
      .replace(/ /g, "-")
      .replace(/'/g, "")
      .replace(/\?/g, "")
      .toLowerCase();

    return <h2 id={id} className={cn("", className)} {...props} />;
  },
  h3: ({ className, ...props }: React.ComponentProps<"h3">) => (
    <h3 className={cn("", className)} {...props} />
  ),
  h4: ({ className, ...props }: React.ComponentProps<"h4">) => (
    <h4 className={cn("", className)} {...props} />
  ),
  h5: ({ className, ...props }: React.ComponentProps<"h5">) => (
    <h5 className={cn("", className)} {...props} />
  ),
  h6: ({ className, ...props }: React.ComponentProps<"h6">) => (
    <h6 className={cn("", className)} {...props} />
  ),
  table: Table,
  thead: TableHeader,
  tbody: TableBody,
  tr: TableRow,
  th: TableHead,
  td: TableCell,
  a: ({ className, ...props }: React.ComponentProps<typeof FumadocsLink>) => (
    <FumadocsLink className={cn("link underline-offset-4", className)} {...props} />
  ),
  Link: ({ className, ...props }: React.ComponentProps<typeof FumadocsLink>) => (
    <FumadocsLink className={cn("link underline-offset-4", className)} {...props} />
  ),
  img: ({ className, ...props }: React.ComponentProps<typeof FumadocsImage>) => (
    <FumadocsImage className={cn("rounded-xl", className)} {...props} />
  ),
  pre: mdxCodeComponents.pre,
  figure: mdxCodeComponents.figure,
  figcaption: mdxCodeComponents.figcaption,
  code: mdxCodeComponents.code,
  Steps: (props: React.ComponentProps<"div">) => (
    <div
      className="md:ml-3.5 md:border-l md:pl-7.5 prose-h3:text-lg prose-h3:text-wrap"
      {...props}
    />
  ),
  Step: ({ className, ...props }: React.ComponentProps<"h3">) => (
    <h3 className={cn("step font-medium", className)} {...props} />
  ),
  FramedImage,
  IframeEmbed,
  YouTubeEmbed,
  SharePageMenu,
  // Registry components
  InlineHint,
};
