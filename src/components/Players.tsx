export default function Players() {
  return (
    <div className="flex flex-col space-y-1">
      <label>Player Limit</label>
      <p className="text-zinc-500 text-sm">
        The maximum number of people that should be able to join the server.
      </p>
      <input
        required
        name="players"
        type="number"
        placeholder="Player Limit"
        defaultValue={20}
        min={1}
      />
    </div>
  );
}
