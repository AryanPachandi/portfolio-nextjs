import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import ProjectFormClient from "../ProjectFormClient";

export const revalidate = 0;

export default async function EditProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const project = await prisma.project.findUnique({
    where: { id },
  });

  if (!project) {
    notFound();
  }

  return <ProjectFormClient initialData={project} />;
}
