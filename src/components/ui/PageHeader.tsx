import { MediaPlaceholder } from "./MediaPlaceholder";
import { Container } from "./Container";

type ImageMeta = {
  alt: string;
  fileName: string;
};

export function PageHeader({
  h1,
  intro,
  image,
}: {
  h1: string;
  intro: string;
  image?: ImageMeta;
}) {
  return (
    <div>
      {image ? (
        <MediaPlaceholder
          alt={image.alt}
          fileName={image.fileName}
          aspect="hero"
          className="w-full"
        />
      ) : null}
      <Container className="py-10 md:py-14">
        <h1 className="max-w-4xl">{h1}</h1>
        <p className="mt-4 max-w-2xl text-lg text-text-muted">{intro}</p>
      </Container>
    </div>
  );
}
