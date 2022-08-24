import * as React from "react";
import { InferGetStaticPropsType } from "next";
import Image from "next/future/image";
import { getPlaiceholder } from "plaiceholder";
import { extractImgSrc } from "@plaiceholder/tailwindcss/utils";
import { ImageGrid, ImageGridItem } from "@plaiceholder/ui";
import { config } from "@/config";
import { Layout } from "@/components/layout";
import { cx } from "class-variance-authority";

const getImagesFromPlaiceholders = (...classNames) =>
  Promise.all(
    classNames.map(async (className) => {
      const { img } = await getPlaiceholder(extractImgSrc(className));

      return { className, ...img };
    })
  );

export const getStaticProps = async () => {
  const images = await getImagesFromPlaiceholders(
    "plaiceholder-[/assets/images/unsplash/alexander-ant-oR7HxvOe2YE.jpg]",
    "plaiceholder-[/assets/images/unsplash/alexander-ant-r7xdS9hjYYE.jpg]",
    "plaiceholder-[/assets/images/unsplash/solen-feyissa-0KXl7T2YU0I.jpg]",
    "plaiceholder-[/assets/images/unsplash/solen-feyissa-ju3ZBdiXzmA.jpg]",
    "plaiceholder-[/assets/images/unsplash/solen-feyissa-tek55norwaQ.jpg]",
    "plaiceholder-[/assets/images/unsplash/solen-feyissa-WX1siNmy_R4.jpg]"
  );

  return {
    props: {
      images,
      title: config.examples.pages.tailwind.title,
      heading: config.examples.variants.multiple.title,
    },
  };
};

const PageTailwindMultiple: React.FC<
  InferGetStaticPropsType<typeof getStaticProps>
> = ({ images, title, heading }) => (
  <Layout variant="example" title={title} heading={heading}>
    <ImageGrid columns={3}>
      {images.map(({ className, ...image }) => (
        <ImageGridItem key={className}>
          <div
            className={cx(
              "absolute",
              "inset-0",
              "w-full",
              "h-full",
              className,
              "transform",
              "scale-150",
              "filter",
              "blur-2xl",
              "z-[-1]"
            )}
          />
          <Image {...image} />
        </ImageGridItem>
      ))}
    </ImageGrid>
  </Layout>
);

export default PageTailwindMultiple;
