import create from 'zustand';
import endpoints from './endpoints';

const useStore = create((set) => ({
  users: [],
  countries: [],
  newUser: {
    name: '',
    email: '',
    phoneNumber: '',
    dob: '',
    city: '',
    district: '',
    province: '',
    country: '',
    
    profilePicture: null,
  },
  errors: {},
  isFormValid: false,
  fetchCountries: async () => {
    try {
      const response = await endpoints.getCountries();
      const data = await response.json();
      set({ countries: data });
    } catch (error) {
      console.error('Error fetching countries:', error);
    }
  },
  addUser: (user) => set((state) => ({ users: [...state.users, user] })),
  updateUser: (index, updatedUser) =>
    set((state) => ({
      users: state.users.map((user, i) => (i === index ? updatedUser : user)),
    })),
  deleteUser: (index) =>
    set((state) => ({ users: state.users.filter((_, i) => i !== index) })),
  setFieldValue: (field, value) =>
    set((state) => ({ newUser: { ...state.newUser, [field]: value } })),
  setProfilePicture: (file) => set((state) => ({ newUser: { ...state.newUser, profilePicture: file } })),
  resetForm: () => set({
    newUser: {
      name: '',
      email: '',
      phoneNumber: '',
      dob: '',
      city: '',
      district: '',
      province: '',
      country: '',
      profilePicture: null,
    }
  }),
  validateForm: () => {
    const { name, email, phoneNumber, profilePicture } = useStore.getState().newUser;
    const errors = {};
    let isFormValid = true;

    if (!name) {
      errors.name = 'Name is required';
      isFormValid = false;
    }
    
    if (!email) {
      errors.email = 'Email is required';
      isFormValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = 'Email must be in valid format';
      isFormValid = false;
    }

    if (!phoneNumber) {
      errors.phoneNumber = 'Phone number is required';
      isFormValid = false;
    } else if (!/^\d{7,}$/.test(phoneNumber)) {
      errors.phoneNumber = 'Phone number must be at least 7 digits';
      isFormValid = false;
    }

    if (profilePicture && !profilePicture.name.endsWith('.png')) {
      errors.profilePicture = 'Profile picture must be a PNG file';
      isFormValid = false;
    }

    set({ errors, isFormValid });
  },
}));

export default useStore;
