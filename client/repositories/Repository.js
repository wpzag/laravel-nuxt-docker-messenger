import ThreadRepository from "@/repositories/messenger/ThreadRepository";
import MessagesRepository from "@/repositories/messenger/MessagesRepository";
import BaseRepository from "@/repositories/messenger/BaseRepository";
import ParticipantsRepository from "@/repositories/messenger/ParticipantsRepository";
import BotsRepository from "@/repositories/messenger/BotsRepository";
import FriendsRepository from "@/repositories/messenger/FriendsRepository";
import UsersRepository from "@/repositories/messenger/UsersRepository";
import CallsRepository from "@/repositories/messenger/CallsRepository";
import InvitationsRepository from "@/repositories/messenger/InvitationsRepository";

export default (ctx) => ({
  messenger: {
    thread: ThreadRepository(ctx),
    messages: MessagesRepository(ctx),
    base: BaseRepository(ctx),
    participants: ParticipantsRepository(ctx),
    bots: BotsRepository(ctx),
    friends: FriendsRepository(ctx),
    users: UsersRepository(ctx),
    calls: CallsRepository(ctx),
    invitations: InvitationsRepository(ctx),
  },
});
