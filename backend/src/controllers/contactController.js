import { supabase } from "../config/supabase.js";

export async function submitContact(req, res, next) {
  try {
    const { firstName, lastName, email, subject, message } = req.body;

    const { data: contact, error } = await supabase
      .from("contacts")
      .insert({
        first_name: firstName,
        last_name: lastName,
        email,
        subject,
        message,
      })
      .select("id")
      .single();

    if (error) throw error;

    res.status(201).json({
      success: true,
      message: "Message sent successfully",
      data: { contact: { id: contact.id } },
    });
  } catch (error) {
    next(error);
  }
}
