import { Contact } from "../Models/ContactModel.js";

// Get data
export const getData = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({createdAt: -1});
    res.json({ message: "All Contacts", contacts, success: true });
  } catch (error) {
    res.json({ message: error.message, success: false });
  }
};

// Add data
export const AddData = async (req, res) => {
  const { name, email, phone } = req.body;

  try {
    let contact = await Contact.findOne({ email });
    if (contact)
      return res.json({ message: "Contact already exists..!", success: false });

    contact = await Contact.create({ name, email, phone });
    res.json({ message: "Contact Added Successfully", contact, success: true });
  } catch (error) {
    res.json({ message: error.message, success: false });
  }
};

//Edit Data
export const UpdateData = async (req, res) => {
  const id = req.params.id;
  const UpdatedData = req.body;
  try {
    const contact = await Contact.findById(id);
    if (!contact) return res.json({ message: "Conatct not exist" });
    let data = await Contact.findByIdAndUpdate(id, UpdatedData, { new: true });
    res.json({ message: "Contact has been updated..!", data, success: true });
  } catch (error) {
    res.json({ message: error.message, success: false });
  }
};

// Delete Data
export const DeleteData = async (req, res) => {
  const id = req.params.id;
  try {
    const contact = await Contact.findById(id);
    if (!contact)
      return res.json({ message: "Data not exist!!", success: false });
    await contact.deleteOne();
    res.json({ message: "Your Contact has been deleted...!" });
  } catch (error) {
    res.json({ message: error.message, success: false });
  }
};
