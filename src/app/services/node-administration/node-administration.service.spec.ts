import { TestBed } from '@angular/core/testing';
import { NodeAdministrationService } from './node-administration.service';
import { MOVIES } from '../../mocks/movies.mock';
import { SEASONS } from '../../mocks/seasons.mock';
import { EPISODES } from '../../mocks/episodes.mock';
import { NodeTree } from '../../models/movies.model';

describe('NodeAdministrationService', () => {
  let service: NodeAdministrationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NodeAdministrationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('createTree', () => {
    it('should create a tree structure based on movies, seasons, and episodes', () => {
      const result = service.createTree(MOVIES);
      expect(result.length).toBe(MOVIES.length);

      // Check if the first movie has seasons and episodes
      const firstMovie = result[0];
      expect(firstMovie?.node?.length).toBeGreaterThan(0);
      const firstSeason = firstMovie?.node ? firstMovie.node[0] : undefined;
      if(firstSeason?.node)
        expect(firstSeason.node.length).toBeGreaterThanOrEqual(0);
    });
  });

  describe('deleteNodeRecursive', () => {
    it('should remove a node with the specified targetId', () => {
      const tree = service.createTree(MOVIES);
      const targetId = tree[0].id;
      
      const result = service.deleteNodeRecursive(tree, targetId);

      expect(result.find(node => node.id === targetId)).toBeUndefined();
    });

    it('should not remove any node if the targetId is not found', () => {
      const tree = service.createTree(MOVIES);
      const targetId = -1; 

      const result = service.deleteNodeRecursive(tree, targetId);
      
      const originalIds = tree.map(n => n.id);
      const resultIds = result.map(n => n.id);

      expect(resultIds).toEqual(originalIds);
    });
  });

  describe('addNode', () => {
    it('should add a new node with the specified name', () => {
      const tree: NodeTree[] = [];
      const newNodeName = 'New Movie';

      service.addNode(tree, newNodeName);

      expect(tree.length).toBe(1);
      expect(tree[0].nodeName).toBe(newNodeName);
    });
  });

  describe('addChildNode', () => {
    it('should add a child node to an existing node', () => {
      const tree = service.createTree(MOVIES);
      const node = tree[0];  
      const newChildNodeName = 'BELLE OF THE BALL S1';

      service.addChildNode(node, newChildNodeName, tree);

      expect(node.node?.length).toBeGreaterThan(0);
      if(node.node)
        expect(node.node[0].nodeName).toBe(newChildNodeName);
    });

    it('should not add a child node if the node has no "node" property', () => {
      const tree = service.createTree(MOVIES);
      const nodeWithoutChildren = tree[0];
      nodeWithoutChildren.node = undefined;
      const newChildNodeName = 'New Child';

      service.addChildNode(nodeWithoutChildren, newChildNodeName, tree);

      expect(nodeWithoutChildren.node).toBeUndefined();
    });
  });

  describe('assignLevels', () => {
    it('should correctly assign levels to nodes', () => {
      const tree = service.createTree(MOVIES);

      expect(tree[0].level).toBe(0);

      if (tree[0].node && tree[0].node[0]) {
        expect(tree[0].node[0].level).toBe(1);
      }
      if(tree[0].node && tree[0].node[0].node && tree[0].node[0].node[0])
      expect(tree[0].node[0].node[0].level).toBe(2);
    });
  });
});
