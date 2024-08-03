import create from 'zustand';

const useStore = create((set) => ({
  users: [],
  countries: [],
  newUser: {
    name: '',
    email: '',
    phoneNumber: '',
    dob: '',
    address: {
      city: '',
      district: '',
      province: '',
      country: '',
    },
    profilePicture: null,
  },
  errors: {},
  isFormValid: false,
  fetchCountries: async () => {
    // Fetch countries from API and update state
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
      address: {
        city: '',
        district: '',
        province: '',
        country: '',
      },
      profilePicture: null,
    }
  }),
  validateForm: () => {
    // Implement validation logic here
    // Update errors and isFormValid accordingly
  },
}));

export default useStore;
