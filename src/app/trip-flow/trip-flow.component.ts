import { Component, HostListener, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { Node, Edge } from '@swimlane/ngx-graph';


@Component({
  selector: 'app-trip-flow',
  templateUrl: './trip-flow.component.html',
  styleUrls: ['./trip-flow.component.scss']
})
export class TripFlowComponent implements OnInit{

  view: [number, number] = [window.innerWidth * 0.8, window.innerHeight * 0.5];

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.view = [window.innerWidth * 0.8, window.innerHeight * 0.5];
  }
  startControl = new FormControl('');
  endControl = new FormControl('');
  update$: Subject<boolean> = new Subject();
  cities: string[] = [
    "Agra",
    "Ahmedabad",
    "Ajmer",
    "Akola",
    "Aligarh",
    "Allahabad (Prayagraj)",
    "Ambattur",
    "Amravati",
    "Amritsar",
    "Asansol",
    "Aurangabad",
    "Bareilly",
    "Belgaum",
    "Bengaluru",
    "Bhilai",
    "Bhiwandi",
    "Bhopal",
    "Bhubaneswar",
    "Bikaner",
    "Chandigarh",
    "Chennai",
    "Coimbatore",
    "Cuttack",
    "Davanagere",
    "Dehradun",
    "Delhi",
    "Dhanbad",
    "Durgapur",
    "Erode",
    "Faridabad",
    "Firozabad",
    "Gaya",
    "Ghaziabad",
    "Gorakhpur",
    "Gulbarga",
    "Guntur",
    "Gurugram",
    "Guwahati",
    "Gwalior",
    "Howrah",
    "Hubballi-Dharwad",
    "Hyderabad",
    "Indore",
    "Jabalpur",
    "Jaipur",
    "Jalandhar",
    "Jammu",
    "Jamnagar",
    "Jamshedpur",
    "Jhansi",
    "Jodhpur",
    "Kalyan-Dombivli",
    "Kanpur",
    "Kochi",
    "Kolhapur",
    "Kolkata",
    "Kota",
    "Kozhikode",
    "Kurnool",
    "Lucknow",
    "Loni",
    "Ludhiana",
    "Madurai",
    "Maheshtala",
    "Malegaon",
    "Mangalore",
    "Meerut",
    "Mira-Bhayandar",
    "Mumbai",
    "Mysuru",
    "Nagpur",
    "Nanded",
    "Nashik",
    "Navi Mumbai",
    "Nellore",
    "Noida",
    "Patna",
    "Pune",
    "Raipur",
    "Rajahmundry",
    "Rajkot",
    "Ranchi",
    "Rourkela",
    "Salem",
    "Saharanpur",
    "Sangli-Miraj & Kupwad",
    "Solapur",
    "Siliguri",
    "Srinagar",
    "Surat",
    "Thane",
    "Thiruvananthapuram",
    "Tiruchirappalli",
    "Tirunelveli",
    "Tiruppur",
    "Udaipur",
    "Ujjain",
    "Ulhasnagar",
    "Vadodara",
    "Varanasi",
    "Vasai-Virar",
    "Vijayawada",
    "Visakhapatnam",
    "Warangal"
  ];
  filteredStartOptions!: Observable<string[]>;
  filteredEndOptions!: Observable<string[]>;
  startPoint: any;
  EndPoint: any;
  tripsData: any = []; 
  nodes: Node[] = [];
  links: Edge[] = []; 
  count: any = 0;
  linkSouce: any;
  linkTarget: any;
  isSameTrip: boolean = false;

 

  ngOnInit() {
    this.filteredStartOptions = this.startControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );

    this.filteredEndOptions = this.endControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );
  }


  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.cities.filter(city => city.toLowerCase().includes(filterValue));
  }


  // Handles adding a new trip, updating nodes, checking continuity, and creating appropriate links for ngx-graph
  addTrip() {
    // Create a trip object from selected start and end points
    let tripMap = {
      start: this.startPoint,
      end: this.EndPoint
    };
  
    let isShowArrow = false;
    let level = 1;
    let nodeId = this.count;
  
    // Generate node label like "DEL - MUM"
    let nodeLabel = tripMap.start.substring(0, 3).toUpperCase() + " - " + tripMap.end.substring(0, 3).toUpperCase();
    this.tripsData.push(tripMap);
  
    // Get the previous node’s label and extract start-end codes
    const prevNode = this.nodes[this.nodes.length - 2];
    const parts = prevNode?.label?.split(" - ");
    const from = parts?.[0].trim(); 
    const to = parts?.[1].trim(); 
  
    // Detect if the same trip is being added
    if (this.tripsData.length > 1 && tripMap.start.substring(0, 3).toUpperCase() == from && tripMap.end.substring(0, 3).toUpperCase() == to) {
      this.isSameTrip = true;
  
      // If no nodes exist yet, add one
      if (this.nodes.length < 1) {
        this.nodes = [
          ...this.nodes,
          { id: String(nodeId), label: nodeLabel, dimension: { width: 20, height: 20 } },
        ];
      }
    } else {
      // Add both source and target nodes for the new trip
      this.nodes = [
        ...this.nodes,
        { id: String(nodeId), label: nodeLabel, dimension: { width: 20, height: 20 } },
        { id: String(nodeId + 1), label: '', dimension: { width: 20, height: 20 } }
      ];
    }
  
    // Remove duplicate node IDs, keeping the one with a label
    this.nodes = this.nodes.reduce((acc: Node[], curr: Node) => {
      const existingIndex = acc.findIndex(n => n.id === curr.id);
      if (existingIndex === -1) {
        acc.push(curr);
      } else if (curr.label && !acc[existingIndex].label) {
        acc[existingIndex] = curr;
      }
      return acc;
    }, []);
  
    // Determine link type based on continuity logic
    if (this.tripsData.length > 1) {
      const prev = this.tripsData[this.tripsData.length - 2];
      if (prev.end === tripMap.start) {
        // Continuous trip
        this.isSameTrip = false;
        isShowArrow = false;
        level = 1;
        this.linkSouce = nodeId;
        this.linkTarget = nodeId + 1;
      } else if (prev.start === tripMap.start && prev.end === tripMap.end) {
        // Repeated trip
        isShowArrow = false;
        level = 2;
        this.linkSouce = this.isSameTrip ? nodeId - 1 : nodeId;
        this.linkTarget = this.isSameTrip ? nodeId : nodeId + 1;
      } else {
        // Disconnected trip
        this.isSameTrip = false;
        isShowArrow = true;
        level = 1;
        this.linkSouce = nodeId;
        this.linkTarget = nodeId + 1;
      }
    }
  
    // Add a new link (edge) to the graph
    this.links = [
      ...this.links,
      {
        id: 'l' + this.generateShortId(),
        source: this.tripsData.length > 1 ? String(this.linkSouce) : String(nodeId),
        target: this.tripsData.length > 1 ? String(this.linkTarget) : String(nodeId + 1),
        label: tripMap.start + ' - ' + tripMap.end,
        data: { level, isShowArrow }
      }
    ];
  
    // Only increment counter if it's not a duplicate trip
    if (!this.isSameTrip) this.count++;
  }
  

  // Generates a random alphanumeric string of specified length (default is 4)
  generateShortId(length: number = 4) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    return Array.from({ length }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
  }



  


  




 
  


 
  

  
}
