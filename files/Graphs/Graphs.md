# GRAPH THEORY

## Introduction  

**Graph theory** is a fundamental area of mathematics that studies relationships between objects. Graphs consist of **vertices** (nodes) connected by **edges** (lines). This guide covers key concepts from basic terminology to advanced applications like graph coloring.

---

## Learnings  

Here’s what I’ve learned about Graphs:

### 1. Graph Terminology  
- **Adjacent Vertices**: Two vertices connected by an edge.  
- **Degree of a Vertex**:  
  - *Undirected graphs*: Number of edges at a vertex (loops count twice).  
  - *Directed graphs*:  
    - *In-degree*: Edges entering the vertex.  
    - *Out-degree*: Edges leaving the vertex.  
- **Handshaking Theorem**: Sum of all vertex degrees = 2 × number of edges.  
- **Simple Graphs**:
  - *Complete graph (Kₙ)*: Every pair of vertices is connected.  

  ![Complete Graph](/files/Graphs/Complete%20.png)

  - *Cycle graph (Cₙ)*: A single cycle linking all vertices.  

  ![Cycle](/files/Graphs/Cycle.png)

  - *Wheels(Wₙ)*: A cycle that have a center vertex which connects all the vertex of the cycle

  ![Wheels](/files/Graphs/Wheel_graphs.svg)

  - *N-cubes(Qₙ)*: An *n*-dimensional hypercube where vertices are adjacent if their *n*-bit strings differ in exactly one bit.

  ![N-cube Graph](/files/Graphs/NCube.png)

- **Special Graphs**:  
  - *Bipartite graph*: Vertices split into two sets with edges only between sets. 

  ![Bipartite Graph](/files/Graphs/Bipartite.png)

  - *Complete Bipartite graph*: All possible edges between the two sets exist. 

  ![Complete Bipartite Graph](/files/Graphs/Complete%20Bipartite.png)

  - *Subgraphs*: A graph formed by a subset of vertices and edges from the original. 

  ![Subgraphs Graph](/files/Graphs/Subgraph.png)

### 2. Representing Graphs  
- **Adjacency Matrix**: A table where rows/columns represent vertices, and entries show connections.  
  - Symmetric for undirected graphs.  

  ![Adjacency Matrix](/files/Graphs/AdjacencyMatrix.png)

- **Adjacency List**: Lists each vertex’s neighbors, efficient for sparse graphs.  

  ![Adjacency List](/files/Graphs/Adjacency%20List.png)

- **Incidence Matrix**: Rows for vertices, columns for edges; entries mark connections.  

  ![Incidence Matrix](/files/Graphs/Incidence%20Matrix.png) 

### 3. Connectivity  
- **Paths**: Sequences of edges linking vertices.  
  - *Simple path*: No repeated edges.  
  - *Circuit*: Path that starts and ends at the same vertex.  
- **Connectedness**:  
  - *Undirected graphs*: A path exists between every pair of vertices.  
  - *Directed graphs*:  
    - *Strongly connected*: Paths exist in both directions between any two vertices.  
    - *Weakly connected*: Connected if edge directions are ignored.  
- **Cut Points/Edges**: Their removal disconnects the graph.  

### 4. Euler and Hamilton Paths  
- **Euler Path/Circuit**:  
  - Traverses every edge exactly once.  
  - *Circuit*: Starts/ends at the same vertex (all degrees even).  

  ![Euler](/files/Graphs/Euler.png)

  - *Path*: Exactly two vertices have odd degrees (start and end points).  
- **Hamilton Path/Circuit**:  
  - Visits every vertex exactly once.  
  - No simple rule to determine existence (unlike Eulerian paths).  

  ![Hamilton](/files/Graphs/Hamilton.png)

### 5. Shortest Path Problems  
- **Dijkstra’s Algorithm**: Finds the shortest path in weighted graphs (non-negative edges).  
  - *Steps*:  
    1. Start at the source vertex.  
    2. Update distances to neighbors.  
    3. Repeat for the next closest vertex until all are visited.  
  - *Applications*: GPS navigation, network routing.  

### 6. Planar Graphs  
- Can be drawn on a plane without edge crossings.  
- **Euler’s Formula**: For connected planar graphs, \(V - E + F = 2\) (vertices, edges, faces).  
- **Kuratowski’s Theorem**: A graph is non-planar if it contains \(K_5\) or \(K_{3,3}\) as a subgraph.  

### 7. Graph Coloring  
- **Vertex Coloring**: Assign colors so no adjacent vertices share the same color.  
  - *Chromatic number*: Minimum colors needed.  
  - *Four Color Theorem*: Any planar graph needs ≤ 4 colors.  
- **Applications**: Scheduling exams, register allocation in compilers.  

---

## Analysis  

Graph theory isn’t just about dots and lines—it’s a way to model relationships, dependencies, and structures in the world. Learning about adjacency, degrees, and special graphs helped me see how objects connect, whether symmetrically (like friendships) or hierarchically (like organizational charts).

The Handshaking Theorem felt like a balancing rule—every edge contributes to two vertices, ensuring no loose ends. Connectivity made me think about robustness—how removing a single point (a "cut vertex") can break a network, while Euler and Hamilton paths showed the difference between covering every path vs. every point efficiently.

Planar graphs introduced spatial constraints—some structures can’t avoid crossing lines, while others fit neatly. Graph coloring turned into a puzzle—how to assign labels without conflicts, like scheduling without overlaps.

---

## Application  

Graph theory’s principles are deeply embedded in everyday life, often in ways we overlook. Simple graphs—composed of nodes (vertices) and connections (edges)—model relationships like social networks, where people are nodes and friendships are edges. Maps are another direct example: landmarks act as vertices, and roads as edges. Matrices, such as adjacency tables, can represent bus routes between cities, with entries indicating direct connections. Connectivity concepts apply to computer networks in schools or offices, where devices (vertices) like printers and workstations must remain linked via pathways (edges). Eulerian paths model efficient garbage truck routes that cover every street without repetition, while Hamiltonian paths mirror delivery riders visiting each neighborhood exactly once. Shortest-path algorithms, like Dijkstra’s, power tools such as Google Maps, optimizing routes by treating road segments as weighted edges. These applications demonstrate how graph theory underpins practical systems, from logistics to digital infrastructure.

---

## Reflection  

Looking back, I realize how much graph theory has quietly shaped the way I see things. Back in senior high, when our teacher made us map out friendships in our classroom, it was eye-opening. Seeing those clusters of friend groups as connected dots made me realize how relationships form networks—some tight-knit, others loosely linked. It wasn’t just a chart; it felt like uncovering the hidden structure of our class dynamics.

Then there’s Google Maps. I don’t just take the shortest route—I tweak it. A longer but smoother road beats a shorter, pothole-filled one any day. It’s like assigning "stress weights" to edges in my mental graph, prioritizing comfort over pure distance. It’s funny how a simple algorithm (even if I didn’t know it was Dijkstra’s at the time) helped me save fuel and sanity on my way to school.

Now, with my VPN tunneling my phone to my home network, I see edges and nodes everywhere. My phone’s the vertex, the VPN’s the edge, and my home router’s another vertex—just a tiny, personal "graph" keeping me connected and allowing me to remote control my computer at home. It’s wild how these abstract ideas turn into real-life tools, whether it’s avoiding traffic or staying online.

Graph theory isn’t just math—it’s a lens. Once you start seeing the world through it, everything feels a little more connected, a little more intentional. And I’m just scratching the surface! 

---

## References  

- CMSC 57 Lecture Notes.  
- Complete Graph: https://mathspace.co/textbooks/syllabuses/Syllabus-1023/topics/Topic-20211/subtopics/Subtopic-279441/?activeTab=theory&activeLessonTab=content
- Cycle: https://www.researchgate.net/publication/372516277/figure/fig4/AS:11431281208040832@1701366649611/Cycle-graphs-Cn-with-n3-4-5-6-vertices.jpg
- Wheel Graph: https://en.wikipedia.org/wiki/Wheel_graph#/media/File:Wheel_graphs.svg
- N-cubes: https://thesai.org/Downloads/Volume10No2/Paper_61-Hypercube_Graph_Decomposition_for_Boolean.pdf
- Bipartite:https://www.researchgate.net/figure/Bipartite-graph-representation-a-First-row-a-bipartite-graph-consisting-of-tree_fig1_349922896
- Complete Bipartite Graph:https://www.gatevidyalay.com/bipartite-graphs/
- Subgraph: https://symbio6.nl/en/blog/theory/definition/subgraph
- Adjaceny Matrix: https://qph.cf2.quoracdn.net/main-qimg-dadfd317f131d8066fc7d5bc244d3b2f
- Adjanceny List: https://www.oreilly.com/library/view/learning-javascript-data/9781788623872/ef9a9b77-a6d4-480b-a4f4-77336f587b36.xhtml
- Incidence Matrix: https://www.electrical4u.com/wp-content/uploads/What-is-Incidence-Matrix.png
- Euler: https://study.com/cimages/multimages/16/euleriantrails5182472584651975439.jpg
- Hamilton: https://media.geeksforgeeks.org/wp-content/uploads/20210214214718/hamiltonianpath1.png