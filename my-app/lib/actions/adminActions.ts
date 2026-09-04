"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import { verifyAdmin, authenticateAdmin, createSession, destroySession } from "@/lib/auth";
import {
  loginSchema,
  siteSettingsSchema,
  projectSchema,
  experienceSchema,
  educationSchema,
  skillSchema,
  socialLinkSchema,
} from "@/lib/validations";

// Helper to revalidate both home and admin paths
function refreshCache() {
  revalidatePath("/");
  revalidatePath("/admin");
  revalidatePath("/admin/projects");
  revalidatePath("/admin/experience");
  revalidatePath("/admin/education");
  revalidatePath("/admin/skills");
  revalidatePath("/admin/social");
  revalidatePath("/admin/profile");
}

// ----------------------------------------------------
// 1. AUTHENTICATION ACTIONS
// ----------------------------------------------------
export async function loginAction(formData: unknown) {
  try {
    const parsed = loginSchema.safeParse(formData);
    if (!parsed.success) {
      return { success: false, error: parsed.error.issues[0].message };
    }

    const { email, password } = parsed.data;
    const admin = await authenticateAdmin(email, password);

    if (!admin) {
      return { success: false, error: "Invalid email or password" };
    }

    await createSession(admin.email);
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error?.message || "Login failed" };
  }
}

export async function logoutAction() {
  await destroySession();
  redirect("/admin/login");
}

// ----------------------------------------------------
// 2. SITE SETTINGS / PROFILE ACTIONS
// ----------------------------------------------------
export async function updateSiteSettingsAction(data: unknown) {
  try {
    await verifyAdmin();
    const parsed = siteSettingsSchema.safeParse(data);
    if (!parsed.success) {
      return { success: false, error: parsed.error.issues[0].message };
    }

    const updated = await prisma.siteSettings.upsert({
      where: { id: "default" },
      update: parsed.data,
      create: { id: "default", ...parsed.data },
    });

    refreshCache();
    return { success: true, data: updated };
  } catch (error: any) {
    return { success: false, error: error?.message || "Failed to update profile" };
  }
}

// ----------------------------------------------------
// 3. PROJECT ACTIONS
// ----------------------------------------------------
export async function createProjectAction(data: unknown) {
  try {
    await verifyAdmin();
    const parsed = projectSchema.safeParse(data);
    if (!parsed.success) {
      return { success: false, error: parsed.error.issues[0].message };
    }

    const created = await prisma.project.create({
      data: parsed.data,
    });

    refreshCache();
    return { success: true, data: created };
  } catch (error: any) {
    if (error.code === "P2002") {
      return { success: false, error: "A project with this slug already exists" };
    }
    return { success: false, error: error?.message || "Failed to create project" };
  }
}

export async function updateProjectAction(id: string, data: unknown) {
  try {
    await verifyAdmin();
    const parsed = projectSchema.safeParse(data);
    if (!parsed.success) {
      return { success: false, error: parsed.error.issues[0].message };
    }

    const updated = await prisma.project.update({
      where: { id },
      data: parsed.data,
    });

    refreshCache();
    return { success: true, data: updated };
  } catch (error: any) {
    return { success: false, error: error?.message || "Failed to update project" };
  }
}

export async function deleteProjectAction(id: string) {
  try {
    await verifyAdmin();
    await prisma.project.delete({ where: { id } });
    refreshCache();
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error?.message || "Failed to delete project" };
  }
}


// ----------------------------------------------------
// 4. EXPERIENCE ACTIONS
// ----------------------------------------------------
export async function createExperienceAction(data: unknown) {
  try {
    await verifyAdmin();
    const parsed = experienceSchema.safeParse(data);
    if (!parsed.success) {
      return { success: false, error: parsed.error.issues[0].message };
    }

    const created = await prisma.experience.create({
      data: parsed.data,
    });

    refreshCache();
    return { success: true, data: created };
  } catch (error: any) {
    return { success: false, error: error?.message || "Failed to create experience" };
  }
}

export async function updateExperienceAction(id: string, data: unknown) {
  try {
    await verifyAdmin();
    const parsed = experienceSchema.safeParse(data);
    if (!parsed.success) {
      return { success: false, error: parsed.error.issues[0].message };
    }

    const updated = await prisma.experience.update({
      where: { id },
      data: parsed.data,
    });

    refreshCache();
    return { success: true, data: updated };
  } catch (error: any) {
    return { success: false, error: error?.message || "Failed to update experience" };
  }
}

export async function deleteExperienceAction(id: string) {
  try {
    await verifyAdmin();
    await prisma.experience.delete({ where: { id } });
    refreshCache();
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error?.message || "Failed to delete experience" };
  }
}

// ----------------------------------------------------
// 5. EDUCATION ACTIONS
// ----------------------------------------------------
export async function createEducationAction(data: unknown) {
  try {
    await verifyAdmin();
    const parsed = educationSchema.safeParse(data);
    if (!parsed.success) {
      return { success: false, error: parsed.error.issues[0].message };
    }

    const created = await prisma.education.create({
      data: parsed.data,
    });

    refreshCache();
    return { success: true, data: created };
  } catch (error: any) {
    return { success: false, error: error?.message || "Failed to create education entry" };
  }
}

export async function updateEducationAction(id: string, data: unknown) {
  try {
    await verifyAdmin();
    const parsed = educationSchema.safeParse(data);
    if (!parsed.success) {
      return { success: false, error: parsed.error.issues[0].message };
    }

    const updated = await prisma.education.update({
      where: { id },
      data: parsed.data,
    });

    refreshCache();
    return { success: true, data: updated };
  } catch (error: any) {
    return { success: false, error: error?.message || "Failed to update education entry" };
  }
}

export async function deleteEducationAction(id: string) {
  try {
    await verifyAdmin();
    await prisma.education.delete({ where: { id } });
    refreshCache();
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error?.message || "Failed to delete education entry" };
  }
}

// ----------------------------------------------------
// 6. SKILLS ACTIONS
// ----------------------------------------------------
export async function createSkillAction(data: unknown) {
  try {
    await verifyAdmin();
    const parsed = skillSchema.safeParse(data);
    if (!parsed.success) {
      return { success: false, error: parsed.error.issues[0].message };
    }

    const created = await prisma.skill.create({
      data: parsed.data,
    });

    refreshCache();
    return { success: true, data: created };
  } catch (error: any) {
    return { success: false, error: error?.message || "Failed to create skill" };
  }
}

export async function updateSkillAction(id: string, data: unknown) {
  try {
    await verifyAdmin();
    const parsed = skillSchema.safeParse(data);
    if (!parsed.success) {
      return { success: false, error: parsed.error.issues[0].message };
    }

    const updated = await prisma.skill.update({
      where: { id },
      data: parsed.data,
    });

    refreshCache();
    return { success: true, data: updated };
  } catch (error: any) {
    return { success: false, error: error?.message || "Failed to update skill" };
  }
}

export async function deleteSkillAction(id: string) {
  try {
    await verifyAdmin();
    await prisma.skill.delete({ where: { id } });
    refreshCache();
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error?.message || "Failed to delete skill" };
  }
}

// ----------------------------------------------------
// 7. SOCIAL LINK ACTIONS
// ----------------------------------------------------
export async function createSocialLinkAction(data: unknown) {
  try {
    await verifyAdmin();
    const parsed = socialLinkSchema.safeParse(data);
    if (!parsed.success) {
      return { success: false, error: parsed.error.issues[0].message };
    }

    const created = await prisma.socialLink.create({
      data: parsed.data,
    });

    refreshCache();
    return { success: true, data: created };
  } catch (error: any) {
    return { success: false, error: error?.message || "Failed to create social link" };
  }
}

export async function updateSocialLinkAction(id: string, data: unknown) {
  try {
    await verifyAdmin();
    const parsed = socialLinkSchema.safeParse(data);
    if (!parsed.success) {
      return { success: false, error: parsed.error.issues[0].message };
    }

    const updated = await prisma.socialLink.update({
      where: { id },
      data: parsed.data,
    });

    refreshCache();
    return { success: true, data: updated };
  } catch (error: any) {
    return { success: false, error: error?.message || "Failed to update social link" };
  }
}

export async function deleteSocialLinkAction(id: string) {
  try {
    await verifyAdmin();
    await prisma.socialLink.delete({ where: { id } });
    refreshCache();
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error?.message || "Failed to delete social link" };
  }
}
