import { Store } from "@material-ui/icons";
import {
  useQuery,
  useQueries,
  QueryClient,
  QueryClientProvider as QueryClientProviderBase,
} from "react-query";
import supabase from "./supabase";

// React Query client
const client = new QueryClient();

/**** USERS ****/

// Fetch user data
// Note: This is called automatically in `auth.js` and data is merged into `auth.user`
export function useUser(uid) {
  // Manage data fetching with React Query: https://react-query.tanstack.com/overview
  return useQuery(
    // Unique query key: https://react-query.tanstack.com/guides/query-keys
    ["user", { uid }],
    // Query function that fetches data
    () =>
      supabase
        .from("users")
        .select(`*, customers ( * )`)
        .eq("id", uid)
        .single()
        .then(handle),
    // Only call query function if we have a `uid`
    { enabled: !!uid }
  );
}

export function useFollowing(uid){
  return useQuery(
    // Unique query key: https://react-query.tanstack.com/guides/query-keys
    ["following", {uid}],
    // Query function that fetches data
    () =>
      supabase
        .from("users")
        .select(`
        id,
        followers!user_id(
          following:following_id(
            id,
            name
          )
        )`)
        .eq("id", uid)
        .single()
        .then(handle),
    // Only call query function if we have a `uid`
    { enabled: !!uid}
  );
}

export function useUsers(){
  return useQuery(
    // Unique query key: https://react-query.tanstack.com/guides/query-keys
    ["users"],
    // Query function that fetches data
    () =>
      supabase
        .from("users")
        .select(`*`)
        .eq("userType", "trader")
        .then(handle),
    // Only call query function if we have a `uid`
    { enabled: true}
  );
}

export function useAllPosts(){
  return useQuery(
    // Unique query key: https://react-query.tanstack.com/guides/query-keys
    ["posts"],
    // Query function that fetches data
    () =>
      supabase
        .from("posts")
        .select(`id, title, content, owner(id, name)`)
        .then(handle),
    // Only call query function if we have a `uid`
    { enabled: true}
  );
}

export function usePosts(uid){
  return useQuery(
    // Unique query key: https://react-query.tanstack.com/guides/query-keys
    ["posts", {uid}],
    // Query function that fetches data
    () =>
      supabase
        .from("posts")
        .select(`id, title, content, owner(id, name)`)
        .eq("owner", uid)
        .then(handle),
    // Only call query function if we have a `uid`
    { enabled: !!uid}
  );
}

export function useRealUser(uid){
  return useQuery(
    // Unique query key: https://react-query.tanstack.com/guides/query-keys
    ["users", {uid}],
    // Query function that fetches data
    () =>
      supabase
        .from("users")
        .select(`*`)
        .eq("id", uid)
        .single()
        .then(handle),
    // Only call query function if we have a `uid`
    { enabled: !!uid}
  );
}

// Fetch user data (non-hook)
// Useful if you need to fetch data from outside of a component
export function getUser(uid) {
  return supabase
    .from("users")
    .select(`*, customers ( * )`)
    .eq("id", uid)
    .single()
    .then(handle);
}

// Update an existing user
export async function updateUser(uid, data) {
  const response = await supabase
    .from("users")
    .update(data)
    .eq("id", uid)
    .then(handle);
  // Invalidate and refetch queries that could have old data
  await client.invalidateQueries(["user", { uid }]);
  return response;
}

/**** ITEMS ****/
/* Example query functions (modify to your needs) */

// Fetch item data
export function useItem(id) {
  return useQuery(
    ["item", { id }],
    () => supabase.from("items").select().eq("id", id).single().then(handle),
    { enabled: !!id }
  );
}

// Fetch all items by owner
export function useItemsByOwner(owner) {
  return useQuery(
    ["items", { owner }],
    () =>
      supabase
        .from("items")
        .select()
        .eq("owner", owner)
        .order("createdAt", { ascending: false })
        .then(handle),
    { enabled: !!owner }
  );
}

export function useIsFollower(user, trader) {
  return useQuery(
    ["followers", { user, trader }],
    () =>
      supabase
        .from("followers")
        .select()
        .eq("user_id", user)
        .eq("following_id", trader)
        .single()
        .then(handle),
    { enabled: !!user && !!trader }
  );
}

export function usePostComments(uid){

  return useQuery(
    ["postComments", { uid }],
    () =>
      supabase
        .from("posts")
        .select('owner(name, id), title, content, comments(comment, owner(name, id))')
        .eq("id", uid)
        .single()
        .then(handle),
    { enabled: !!uid }
  );
}

// Create a new item
export async function createItem(data) {
  const response = await supabase.from("items").insert([data]).then(handle);
  // Invalidate and refetch queries that could have old data
  await client.invalidateQueries(["items"]);
  return response;
}

export async function createComment (data, postId) {
  const response = await supabase.from("comments").insert([data]).then(handle);
  // Invalidate and refetch queries that could have old data
  await client.invalidateQueries(["postComments", {postId}]);
  return response;
}

export async function createFollower(data) {
  const response = await supabase.from("followers").insert([data]).then(handle);
  await client.invalidateQueries(["followers"]);
  return response;
}

export async function createPost(data) {
  const response = await supabase.from("posts").insert([data]).then(handle);
  await client.invalidateQueries(["posts"]);
  return response;
}

// Update an item
export async function updateItem(id, data) {
  const response = await supabase
    .from("items")
    .update(data)
    .eq("id", id)
    .then(handle);
  // Invalidate and refetch queries that could have old data
  await Promise.all([
    client.invalidateQueries(["item", { id }]),
    client.invalidateQueries(["items"]),
  ]);
  return response;
}

// Delete an item
export async function deleteItem(id) {
  const response = await supabase
    .from("items")
    .delete()
    .eq("id", id)
    .then(handle);
  // Invalidate and refetch queries that could have old data
  await Promise.all([
    client.invalidateQueries(["item", { id }]),
    client.invalidateQueries(["items"]),
  ]);
  return response;
}

export function useScoreBoard(leagueId){
  return useQuery(
    ["scoreBoard", { leagueId }],
    () =>
      supabase
        .from("score_tokens")
        .select("*")
        .eq("league_id", leagueId)
        .order("score", { ascending: false })
        .then(handle),
    { enabled: !!leagueId }
  );
}

export function useLeagueTicket(playerId, leagueId){
  return useQuery(
    ["playerLeagueTicket", { playerId, leagueId }],
    () =>
      supabase
        .from("leagues_tickets")
        .select("id, token_identifier")
        .eq("league_id", leagueId)
        .eq("player_id", playerId)
        .single()
        .then(handle),
    { enabled: !!leagueId && !! playerId }
  );
}


async function fetchData(score){
  const resp = await fetch(`https://api.sandbox.x.immutable.com/v1/assets/${score.token_identifier}`);
  const json = await resp.json()
  return {...score, ...json }
}
export function useMetaData(scores){
  return useQueries(
    (scores || []).filter(s => s.token_identifier).map(score => {
      return {
        queryKey: ["metadata", score.player_id, score.league_id],
        queryFn: async () => await fetchData(score)
      }
    })
  )
    // return fetch(`https://api.sandbox.x.immutable.com/v1/assets/${identifier}`).then(resp => resp.json())
}

/**** HELPERS ****/

// Get response data or throw error if there is one
function handle(response) {
  console.log(response)
  if (response.error) throw response.error;
  return response.data;
}

// React Query context provider that wraps our app
export function QueryClientProvider(props) {
  return (
    <QueryClientProviderBase client={client}>
      {props.children}
    </QueryClientProviderBase>
  );
}
