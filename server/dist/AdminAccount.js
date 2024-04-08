import bcrypt from 'bcrypt';
import { Admin } from './models/AdminModel.ts';
async function AdminAccount() {
    try {
        const adminCount = await Admin.countDocuments();
        if (adminCount === 0) {
            const hashPassword = await bcrypt.hash('adminpassword', 10);
            const newAdmin = new Admin({
                username: 'admin',
                password: hashPassword
            });
            await newAdmin.save();
            console.log("Admin account created");
        }
        else {
            console.log("Admin account already exists");
        }
    }
    catch (err) {
        console.log("Error:", err.message);
    }
}
AdminAccount();
//# sourceMappingURL=AdminAccount.js.map