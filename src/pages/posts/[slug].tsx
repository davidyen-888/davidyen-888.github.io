import Date from "@/components/Date";
import { Box, Container, Link, Typography } from "@mui/material";
import ReactMarkdown from "react-markdown";
import ThemeBox from "@/components/ThemeBox";
import NotionService from "@/lib/notionService";
import { useTheme } from "next-themes";
import { InferGetStaticPropsType } from "next";

export async function getStaticPaths() {
  const notionService = new NotionService();

  const posts = await notionService.getAllBlogPosts();

  const paths = posts.map((post: { slug: string }) => {
    return `/posts/${post.slug}`;
  });

  return {
    paths,
    fallback: false,
  };
}

export const getStaticProps = async (context: any) => {
  const notionService = new NotionService();

  const postData = await notionService.getSingleBlogPost(
    context.params?.slug as string
  );

  if (!postData) {
    throw new Error("Post not found");
  }

  return {
    props: {
      markdown: postData.markdown,
      post: postData.post,
    },
  };
};

export default function Post({
  markdown,
  post,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const { theme } = useTheme();

  const markdownComponents = {
    p: ({ children }: { children: React.ReactNode }) => (
      <p style={{ margin: "1.5rem 0", lineHeight: "2rem" }}>{children}</p>
    ),
    h1: ({ children }: { children: React.ReactNode }) => (
      <h1 style={{ margin: "1.5rem 0" }}> {children}</h1>
    ),
    h2: ({ children }: { children: React.ReactNode }) => (
      <h2 style={{ margin: "1.5rem 0" }}> {children}</h2>
    ),
    ul: ({ children }: { children: React.ReactNode }) => (
      <ul style={{ marginLeft: "2rem", lineHeight: "2rem" }}>{children}</ul>
    ),
    ol: ({ children }: { children: React.ReactNode }) => (
      <ol style={{ marginLeft: "2rem", lineHeight: "2rem" }}>{children}</ol>
    ),
    li: ({ children }: { children: React.ReactNode }) => (
      <li style={{ margin: "0.5rem 0" }}>{children}</li>
    ),
    img: ({ src, alt }: any) => (
      <img
        src={src}
        alt={alt}
        style={{
          maxWidth: "100%",
          height: "auto",
          margin: "1.5rem 0",
        }}
      />
    ),
    code: ({ node, inline, className, children }: any) => {
      const match = /language-(\w+)/.exec(className || "");
      return !inline && match ? (
        <Typography
          fontSize={{ xs: "0.8rem", md: "1rem" }}
          component="pre"
          sx={{
            backgroundColor: theme === "dark" ? "#424242" : "#f5f5f5",
            borderRadius: "0.5rem",
            padding: "1rem",
            margin: "1.5rem 0",
            overflowX: "auto",
          }}
        >
          <code
            className={className}
            style={{
              color: theme === "dark" ? "#fff" : "#000",
            }}
          >
            {children}
          </code>
        </Typography>
      ) : (
        <code className={className}>{children}</code>
      );
    },
  };

  return (
    <ThemeBox title={post.title}>
      <Container
        maxWidth="md"
        sx={{
          mt: "6rem",
        }}
      >
        <Box sx={{ my: 2 }}>
          <Typography
            variant="h3"
            fontWeight={"bold"}
            sx={{ fontSize: { xs: "2rem", md: "3rem" }, textAlign: "center" }}
          >
            {post.title}
          </Typography>
        </Box>
        <Box height={"2rem"} sx={{ my: 2, textAlign: "center" }}>
          <Typography sx={{ fontSize: { xs: "1rem", md: "1.5rem" } }}>
            <Date dateString={post.date} />
          </Typography>
        </Box>
        <Box sx={{ my: 2 }}>
          <Typography
            variant="body1"
            sx={{ fontSize: { xs: "1rem", md: "1.5rem" } }}
          >
            <ReactMarkdown components={markdownComponents}>
              {markdown}
            </ReactMarkdown>
          </Typography>
        </Box>
        <Box sx={{ my: 2 }}>
          <Typography
            variant="body1"
            sx={{ fontSize: { xs: "1rem", md: "1.5rem" } }}
          >
            <Link href="/posts">← Back to all posts</Link>
          </Typography>
        </Box>
      </Container>
    </ThemeBox>
  );
}
