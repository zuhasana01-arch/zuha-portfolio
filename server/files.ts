import { z } from "zod";
import { publicProcedure, router } from "./_core/trpc";
import { storagePut, storageGet } from "./storage";

export const filesRouter = router({
  // Upload a file (resume, project file, etc.)
  upload: publicProcedure
    .input(
      z.object({
        fileName: z.string().min(1),
        fileContent: z.string(), // base64 encoded
        fileType: z.string().default("application/octet-stream"),
        category: z.enum(["resume", "project", "asset"]).default("asset"),
      })
    )
    .mutation(async ({ input }) => {
      try {
        // Decode base64 to buffer
        const buffer = Buffer.from(input.fileContent, "base64");

        // Create a path based on category
        const timestamp = Date.now();
        const path = `portfolio/${input.category}/${timestamp}-${input.fileName}`;

        // Upload to storage
        const result = await storagePut(path, buffer, input.fileType);

        return {
          success: true,
          key: result.key,
          url: result.url,
          fileName: input.fileName,
          uploadedAt: new Date().toISOString(),
        };
      } catch (error) {
        throw new Error(
          `File upload failed: ${error instanceof Error ? error.message : "Unknown error"}`
        );
      }
    }),

  // Get download URL for a file
  getDownloadUrl: publicProcedure
    .input(
      z.object({
        fileKey: z.string().min(1),
      })
    )
    .query(async ({ input }) => {
      try {
        const result = await storageGet(input.fileKey);
        return {
          success: true,
          url: result.url,
          key: result.key,
        };
      } catch (error) {
        throw new Error(
          `Failed to get download URL: ${error instanceof Error ? error.message : "Unknown error"}`
        );
      }
    }),

  // Get resume download URL (convenience method)
  getResumeUrl: publicProcedure.query(async () => {
    try {
      // Try to get the most recent resume file
      const result = await storageGet("portfolio/resume/resume.pdf");
      return {
        success: true,
        url: result.url,
      };
    } catch {
      // Return null if no resume found
      return {
        success: false,
        url: null,
      };
    }
  }),
});
