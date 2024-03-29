import { Fragment, useEffect, useState } from 'react'
import { Popover, Transition } from '@headlessui/react'

import { Link } from "react-router-dom";


import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged} from "firebase/auth";
import { Disclosure, Menu } from '@headlessui/react'
import { token } from 'morgan';

const user = {
  name: 'Tom Cook',
  email: 'tom@example.com',
  imageUrl: ""
}
const navigation = [
  { name: 'Home', href: '#', current: true },
  { name: 'Usage History', href: '#', current: false },
  { name: 'Your Account', href: '#', current: false },
]
const userNavigation = [
  { name: 'Your Profile', href: '#' },
  { name: 'Settings', href: '#' },
  { name: 'Sign out', href: '#' },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}
const firebaseConfig = {
    apiKey: "AIzaSyDg5A-ZTsoFMiSPXs9YnPlH4svF72yAoss",
    authDomain: "psulaunchbox.firebaseapp.com",
    projectId: "psulaunchbox",
    storageBucket: "psulaunchbox.appspot.com",
    messagingSenderId: "313509793012",
    appId: "1:313509793012:web:a407e0d847c84746cd22a1",
    measurementId: "G-ZFVR1T4SB0"
  };
  
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth();

// name hook
const people = [
  { name: 'PLA 3D Printer Filament', amount: '1.4 LB', time: 'unknown' },
  // More people...
]

function checkIn() {
  // Check in user via API using get request to API
  // If successful, return true
  // If not, return false

  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      window.location.reload();
    }
  }
  xhttp.open("POST", `${process.env.REACT_APP_API_URL}/checkin?uid=${localStorage.getItem("token")}`, true);
  xhttp.send();


}

registerAcc();

// register acc on load
function registerAcc() {
  // Check in user via API using get request to API
  // If successful, return true
  // If not, return false

  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      window.location.reload();
    }
  }
  xhttp.open("POST", `${process.env.REACT_APP_API_URL}/register?uid=${localStorage.getItem("token")}`, true);
  xhttp.send();
}

function checkOut() {
  // Check in user via API using get request to API
  // If successful, return true
  // If not, return false

  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      window.location.reload();
    }
  }
  xhttp.open("POST", `${process.env.REACT_APP_API_URL}/checkout?uid=${localStorage.getItem("token")}`, true);
  xhttp.send();


}

function newMaterial() {
  let material = window.prompt("Material Name?");
  let quantity = window.prompt("Quantity?");

  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      window.location.reload();
    }
  }
  xhttp.open("POST", `${process.env.REACT_APP_API_URL}/material?uid=${localStorage.getItem("token")}&material=${material}&amount=${quantity}`, true);
  xhttp.send();

}

// Load in dashboard data
function loadDashboardData() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      let userObject = JSON.parse(this.responseText);

      let resourceUsage = userObject.resourceUsage;


      resourceUsage.forEach((resource) => {
        const tbody = document.getElementById("resourceTable")
  
        const newRow = document.createElement('tr')
        newRow.innerHTML = `<td>${resource.material}</td><td>${resource.amount}</td><td>${resource.time}</td>`

        tbody.appendChild(newRow)
      })

      if (userObject.isCheckedIn) {
        document.getElementById("deskOut").classList.remove("hidden")
        document.getElementById("buttonOut").classList.remove("hidden")

      } else {
        document.getElementById("deskIn").classList.remove("hidden")
        document.getElementById("buttonIn").classList.remove("hidden")


      }
    }
  }
  xhttp.open("POST", `${process.env.REACT_APP_API_URL}/dashboard?uid=${localStorage.getItem("token")}`, true);
  xhttp.send();
}

loadDashboardData();

const Dashboard = () => {


  const [name, setUsername] = useState("Loading...");


  useEffect (() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        setUsername(user.email.split("@")[0]);
        localStorage.setItem("token", user.uid)
      } else {
        window.location.href = "../login"
      }
    });
    
  });

  document.title = "PSU Launchbox - Dashboard" 


  return (
    
    
    <Disclosure as="nav" className="bg-white shadow">
    {({ open }) => (
      <>
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
          <div className="relative flex h-16 justify-between">
            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
              {/* Mobile menu button */}
              <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                <span className="sr-only">Open main menu</span>
                {open ? (
                 <i class="fas fa-bars"></i>
                ) : (
                  <i class="fas fa-bars"></i>
                )}
              </Disclosure.Button>
            </div>
            <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
              <div className="flex flex-shrink-0 items-center">
                  <h1 className='text-2xl'>Utility Works</h1>
              </div>
              <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                {/* Current: "border-indigo-500 text-gray-900", Default: "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700" */}
                <a
                  href="#"
                  className="inline-flex items-center border-b-2 border-indigo-500 px-1 pt-1 text-sm font-medium text-gray-900"
                >
                  Home
                </a>
        
          
      
              </div>
            </div>
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              <button
                type="button"
                className="rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                <span className="sr-only">View notifications</span>
              </button>

              {/* Profile dropdown */}
              <Menu as="div" className="relative ml-3">
                <div>
             
                  <Menu.Button className="flex rounded-full bg-white text-sm ">
                    <span className="sr-only">Open user menu</span>
                    <i class="fas fa-chevron-circle-down text-3xl"></i>
                  </Menu.Button>
                </div>
                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-200"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                
                    <Menu.Item>
                      {({ active }) => (
                        <a
                          href="#"
                          className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                        >
                          Sign out
                        </a>
                      )}
                    </Menu.Item>
                  </Menu.Items>
                </Transition>
              </Menu>
            </div>
          </div>
        </div>

        <Disclosure.Panel className="sm:hidden">
          <div className="space-y-1 pt-2 pb-4">
            {/* Current: "bg-indigo-50 border-indigo-500 text-indigo-700", Default: "border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700" */}
            <Disclosure.Button
              as="a"
              href="#"
              className="block border-l-4 border-indigo-500 bg-indigo-50 py-2 pl-3 pr-4 text-base font-medium text-indigo-700"
            >
              Home
            </Disclosure.Button>
         
          </div>
        </Disclosure.Panel>

        <div className="bg-white py-16 sm:py-24 hidden">
      <div className="relative sm:py-16">
        <div aria-hidden="true" className="hidden sm:block">
          <div className="absolute inset-y-0 left-0 w-1/2 rounded-r-3xl bg-gray-50" />
          <svg className="absolute top-8 left-1/2 -ml-3" width={404} height={392} fill="none" viewBox="0 0 404 392">
            <defs>
              <pattern
                id="8228f071-bcee-4ec8-905a-2a059a2cc4fb"
                x={0}
                y={0}
                width={20}
                height={20}
                patternUnits="userSpaceOnUse"
              >
                <rect x={0} y={0} width={4} height={4} className="text-gray-200" fill="currentColor" />
              </pattern>
            </defs>
            <rect width={404} height={392} fill="url(#8228f071-bcee-4ec8-905a-2a059a2cc4fb)" />
          </svg>
        </div>
        <div className="mx-auto max-w-md px-4 sm:max-w-3xl sm:px-6 lg:max-w-7xl lg:px-8">
          <div className="relative overflow-hidden rounded-2xl bg-indigo-600 px-6 py-10 shadow-xl sm:px-12 sm:py-20">
            <div aria-hidden="true" className="absolute inset-0 -mt-72 sm:-mt-32 md:mt-0">
              <svg
                className="absolute inset-0 h-full w-full"
                preserveAspectRatio="xMidYMid slice"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 1463 360"
              >
                <path
                  className="text-indigo-500 text-opacity-40"
                  fill="currentColor"
                  d="M-82.673 72l1761.849 472.086-134.327 501.315-1761.85-472.086z"
                />
                <path
                  className="text-indigo-700 text-opacity-40"
                  fill="currentColor"
                  d="M-217.088 544.086L1544.761 72l134.327 501.316-1761.849 472.086z"
                />
              </svg>
            </div>
            <div className="relative">
              <div className="sm:text-center">
                <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                  Looks like you haven't completed training yet.
                </h2>
                <p className="mx-auto mt-6 max-w-2xl text-lg text-indigo-200">
                        In order to use equipment independently at this Utility Works makerspace, you'll need to complete some training. Ask a staff member for more information.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div className="bg-indigo-700">
      <div className="mx-auto max-w-2xl py-16 px-4 text-center sm:py-10 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
          <span className="block">Welcome to Utility Works.</span>
        </h2>
        <p id="deskIn" className="hidden text-lg leading-6 text-indigo-200">
         Looks like you haven't checked in yet. 
        </p>
        <p id="deskOut" className="hidden text-lg leading-6 text-indigo-200">
         Please check out before leaving.
        </p>
        <a
          id="buttonIn"
          href="#"
          className="hidden mt-4 inline-flex w-full items-center justify-center rounded-md border border-2 px-5 py-3 text-base font-medium text-white hover:bg-indigo-800 sm:w-half"

          onClick={checkIn}
        >
          Check in
        </a>

        <a
          id="buttonOut"
          href="#"
          className="hidden mt-4 inline-flex w-full items-center justify-center rounded-md border border-2 px-5 py-3 text-base font-medium text-white hover:bg-indigo-800 sm:w-half"
          onClick={checkOut}
        >
          Check out
        </a>
      </div>
    </div>

  <div class="bg-white"> 
    <div class="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-xl font-semibold text-gray-900">Resource Usage</h1>
          <p className="mt-2 text-sm text-gray-700">
            Keep track of resources you used here at Utility Works.
          </p>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
            onClick={newMaterial}
          >
            Add Resource
          </button>
        </div>
      </div>
      <div className="mt-8 flex flex-col">
        <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                     Resource Name
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                     Quantity
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                     Date/Time
                    </th>
                 
                  </tr>
                </thead>
                <tbody id="resourceTable" className="divide-y divide-gray-200 bg-white">
                
              
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
    </div>



      </>
    )}
  </Disclosure>




  )
}

  
export default Dashboard;