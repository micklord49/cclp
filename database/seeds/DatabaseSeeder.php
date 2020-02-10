<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;



use App\Cclp;
use App\DnAlias;
use App\Clprole;
use App\ClpRoleuser;
use App\User;
use App\Branch;
use App\Helptext;
use App\Council;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $guids = array(
            "CLP" => uniqid("CLP"),

            "ADMINUSER" => uniqid("USR"),

            "COUNCIL" => uniqid("CNC"),

            "CHAIR" => uniqid("ROL"),
            "SECRETARY" => uniqid("ROL"),
            "TREASURER" => uniqid("ROL"),
            "POLICY" => uniqid("ROL"),
            "WOMENS" => uniqid("ROL"),
            "CAMPAIGNS" => uniqid("ROL"),
            "MEMBERSHIP" => uniqid("ROL"),
            "DIGITAL" => uniqid("ROL"),

            // TEST DATA
            "USER1" => uniqid("USR"),
            "USER2" => uniqid("USR"),
        );

        $this->call(UserTableSeeder::class,$guids);
        $this->call(ClpTableSeeder::class,$guids);
        $this->call(CouncilTableSeeder::class,$guids);
        $this->call(ClpRolesTableSeeder::class,$guids);
        $this->call(BranchTableSeeder::class,$guids);
        $this->call(RolesAndPermissionsSeeder::class,$guids);
        $this->call(HelpTextTableSeeder::class,$guids);
    }

    public function call($class, $extra = null) 
    {
        $this->resolve($class)->run($extra);

        if (isset($this->command)) {
            $this->command->getOutput()->writeln("<info>Seeded:</info> $class");
        }
    }
}

class ClpTableSeeder extends Seeder 
{
    public function run($guids)
    {
        DB::table('cclps')->delete();
        Cclp::create(array(
            'guid' => $guids["CLP"],
            'name' => 'My New CLP',
            'description' => 'Who we are',
            'dn' => 'localhost',
            'email' => 'admin@localhost',
            'phone' => '',
            'groupCouncillorsByWard' => false
        ));


        DB::table('dn_aliases')->delete();
        DnAlias::create(array(
            'clp' => $guids["CLP"],
            'dn' => '87.81.186.254'
        ));
    }

}

class CouncilTableSeeder extends Seeder 
{
    public function run($guids)
    {
        DB::table('councils')->delete();

        Council::create(array(
            'clp' => $guids["CLP"],
            'guid' => $guids["COUNCIL"],
            'name' => 'My local council',
        ));
    }

}


class ClpRolesTableSeeder extends Seeder 
{

    public function run($guids)
    {

        DB::table('clproles')->delete();

        Clprole::create(array(
            'clp' => $guids["CLP"],
            'guid' => $guids["CHAIR"],
            'description' => 'Chair',
            'help' => 'ec.chair',
            'mandatory' => 1,
            'clpdefined' => 0,
            'sortorder' => 1,
            'help' => ''
        ));
        Clprole::create(array(
            'clp' => $guids["CLP"],
            'guid' => $guids["SECRETARY"],
            'description' => 'Secretary',
            'help' => 'ec.secretary',
            'mandatory' => 1,
            'clpdefined' => 0,
            'sortorder' => 2
        ));
        Clprole::create(array(
            'clp' => $guids["CLP"],
            'guid' => $guids["TREASURER"],
            'description' => 'Treasurer',
            'help' => 'ec.treasurer',
            'mandatory' => 1,
            'clpdefined' => 0,
            'sortorder' => 3
        ));
        Clprole::create(array(
            'clp' => $guids["CLP"],
            'guid' => $guids["POLICY"],
            'description' => 'Policy',
            'help' => 'ec.policy',
            'mandatory' => 1,
            'clpdefined' => 0,
            'sortorder' => 4
        ));
        Clprole::create(array(
            'clp' => $guids["CLP"],
            'guid' => $guids["WOMENS"],
            'description' => 'Womens Officer',
            'help' => '',
            'mandatory' => 0,
            'clpdefined' => 0,
            'sortorder' => 4
        ));
        Clprole::create(array(
            'clp' => $guids["CLP"],
            'guid' => $guids["CAMPAIGNS"],
            'description' => 'Campaigns Officer',
            'help' => '',
            'mandatory' => 0,
            'clpdefined' => 0,
            'sortorder' => 4
        ));
        Clprole::create(array(
            'clp' => $guids["CLP"],
            'guid' => $guids["MEMBERSHIP"],
            'description' => 'Membership Officer',
            'help' => '',
            'mandatory' => 0,
            'clpdefined' => 0,
            'sortorder' => 4
        ));
        Clprole::create(array(
            'clp' => $guids["CLP"],
            'guid' => $guids["DIGITAL"],
            'description' => 'Digital Officer',
            'help' => '',
            'mandatory' => 0,
            'clpdefined' => 0,
            'sortorder' => 4
        ));


        // Test Data
        ClpRoleuser::create(array(
            'clp' => $guids["CLP"],
            'clprole' => $guids["DIGITAL"],
            'user' => $guids["USER1"]
        ));
        ClpRoleuser::create(array(
            'clp' => $guids["CLP"],
            'clprole' => $guids["CHAIR"],
            'user' => $guids["USER2"]
        ));

    }

}


class UserTableSeeder extends Seeder {

    public function run($guids)
    {
        DB::table('users')->delete();

        User::create(array(
            'guid' => $guids["ADMINUSER"],
            'clp' => $guids["CLP"],
            'name' => 'Default Admin User',
            'email' => 'admin@root.com',
            'password' => Hash::make("admin"),
        ));

        // TEST DATA
        User::create(array(
            'guid' => $guids["USER1"],
            'clp' => $guids["CLP"],
            'name' => 'Mick',
            'email' => 'mick@root.com',
            'password' => Hash::make("pass"),
        ));

        // TEST DATA
        User::create(array(
            'guid' => $guids["USER2"],
            'clp' => $guids["CLP"],
            'name' => 'Caleb',
            'email' => 'caleb@root.com',
            'password' => Hash::make("pass"),
        ));

    }

}

class BranchTableSeeder extends Seeder {

    public function run($guids)
    {
        DB::table('branches')->delete();

        Branch::create(array(
            'guid' => uniqid("BRC"),
            'clp' => $guids["CLP"],
            'name' => 'First Branch',
        ));
    }
}

class HelpTextTableSeeder extends Seeder {

    public function run($guids)
    {
        DB::table('helptexts')->delete();

        Helptext::create(array(
            'name' => 'ec.role',
            'heading' => 'The Executive Committe',
            'text' => '
            <p>
            The Executive Committee shall meet as required
and be responsible for reviewing the
implementation of the development action plan
and supervising the work of the branches and
other Party units in the constituency. The
Executive Committee shall also deal with as much
of the routine business of this CLP as possible to
ensure that the General Meeting can devote its
time to the discussion of policy and Party
objectives for the constituency.
            </p>',
            'sortorder' => 0,
        ));

        Helptext::create(array(
            'name' => 'clp.role',
            'heading' => 'Your Constituency Labour Party',
            'text' => '
            A constituency Labour Party (CLP) is an organisation of members of the Labour Party 
            who live in a particular UK parliamentary constituency in England and Wales. 
            In Scotland, CLP boundaries align with constituencies of the Scottish Parliament. 
            The Labour Party in Northern Ireland is organised as a province-wide constituency Labour Party. 
            ',
            'sortorder' => 0,
        ));

        Helptext::create(array(
            'name' => 'clp.role.full',
            'heading' => 'The Constituency Labour Party',
            'text' => '
            <ul>
            <li>To unite the forces of Labour within the
            constituency and to ensure the establishment
            of, and to keep in active operation an
            appropriate organisation and structure, which
            shall normally include branches, as approved
            by the NEC.</li>

            <li>To secure the return of Labour
            representatives to Parliament and local
            government bodies, by promoting the policies
            and principles of the Party throughout the
            constituency with a view to increasing the
            Party’s influence within the local community
            and securing support and membership from
            it.</li>

            <li>To promote the policies of the Party within the
            constituency by formulating a development
            action plan for the Party in the area and to
            ensure its adoption and implementation by all
            Party units.</li>

            <li>To provide the opportunity for all individual
            members of the Party within the constituency
            to contribute to the development of the aims
            and policies by ensuring that a full range of
            Party activities are available to them, including
            local policy forums, and that they may
            participate fully in discussion to broaden the
            political education of members of the Party
            and to increase their influence over the
            formulation of the Party programme.</li>

            <li>To establish local policy forums, possibly in
            co-operation with neighbouring CLPs, as
            authorised by and with the support of the
            appropriate RD(GS) operating to guidelines
            produced by the NEC. The constitution of the
            Party places an obligation on CLPs to work in
            pursuit of our aims with trade unions, cooperative societies and other affiliated
            organisations, and it must consult its
            members, elected representatives, affiliated
            organisations, and, where practicable, the
            wider community in which it is based on policy
            making initiatives which are to be forwarded
            for consideration as part of the national policy
            making process.</li>            
            </ul>',
            'sortorder' => 0,
        ));

        Helptext::create(array(
            'name' => 'profile.picture',
            'heading' => 'Your profile picture',
            'text' => '
    This image is used to identify you. You should use it to express your personality.        
            ',
            'sortorder' => 0,
        ));
        Helptext::create(array(
            'name' => 'profile.picture.full',
            'heading' => 'Guidelines for your image',
            'text' => '
            <ul>
              <li>The picture should be in a 6:9 ratio. You can use the controls to crop your image if needed.</li>
              <li>You should be the only person in the image</li>
              <li>Try to keep the background as plain and neutral as possible.</li>
            </ul>
            ',
            'sortorder' => 0,
        ));

        Helptext::create(array(
            'name' => 'councillor.text',
            'heading' => 'Your bio',
            'text' => '
    Use this block of text to describe yourself as a councillor.        
            ',
            'sortorder' => 0,
        ));
        Helptext::create(array(
            'name' => 'councillor.text.full',
            'heading' => 'Guidelines for your bio',
            'text' => "
            Use this bio to give people a sense of your personality and your passions. 
            Suggestions of information you could include:
            <ul>
              <li>List campaigns you have been involved in.</li>
              <li>List the committes you've sat on</li>
              <li>tell people about your passions.</li>
            </ul>
            ",
            'sortorder' => 0,
        ));

        Helptext::create(array(
            'name' => 'facebook.api',
            'heading' => 'Linking to Facebook',
            'text' => '
    You can use the following fields to link your account to your Facebook Page so we can post updates directly to your newsfeed.        
            ',
            'sortorder' => 0,
        ));
        Helptext::create(array(
            'name' => 'facebook.api.full',
            'heading' => 'Guide',
            'text' => "
            <p>
                It can seem quite daunting to link to facebook, but it is actually quite straight forward. You can try following these steps:
            </p>
            <ul>
              <li>List campaigns you have been involved in.</li>
              <li>List the committes you've sat on</li>
              <li>tell people about your passions.</li>
            </ul>
            <p>
                It you still need help, try these links:
            </p>
            ",
            'sortorder' => 0,
        ));

        Helptext::create(array(
            'name' => 'ec.chair',
            'heading' => 'The EC Chair',
            'text' => '',
            'sortorder' => 0,
        ));

        Helptext::create(array(
            'name' => 'ec.chair.full',
            'heading' => 'Duties',
            'text' => '',
            'sortorder' => 0,
        ));

        Helptext::create(array(
            'name' => 'ec.secretary',
            'heading' => 'The EC Secretary',
            'text' => '',
            'sortorder' => 0,
        ));

        Helptext::create(array(
            'name' => 'ec.chair',
            'heading' => 'The EC Treasurer',
            'text' => '',
            'sortorder' => 0,
        ));

        Helptext::create(array(
            'name' => 'ec.chair',
            'heading' => 'The EC Chair',
            'text' => '',
            'sortorder' => 0,
        ));

        Helptext::create(array(
            'name' => 'event.location',
            'heading' => 'Location',
            'text' => 'Please give clear directions to the event.',
            'sortorder' => 0,
        ));

        Helptext::create(array(
            'name' => 'campaign.text',
            'heading' => 'Campaign Description',
            'text' => 'Please give clear description of your campaign.',
            'sortorder' => 0,
        ));

        Helptext::create(array(
            'name' => 'campaign.text.full',
            'heading' => 'What to write?',
            'text' => '
                <p>
                    It can seem quite daunting to write a good description. You can try writing a paragraph for each of these:
                </p>
                <ul>
                <li>What is going to happen</li>
                <li>Why is this bad</li>
                <li>What do you want to change about the situation</li>
                <li>How are you going to achieve this</li>
                </ul>
            ',
            'sortorder' => 0,
        ));
    }
}

class RolesAndPermissionsSeeder extends Seeder
{
    public function run($guids)
    {
        // Reset cached roles and permissions
        DB::table('roles')->delete();
        DB::table('permissions')->delete();
        DB::table('role_has_permissions')->delete();
        DB::table('model_has_permissions')->delete();
        DB::table('model_has_roles')->delete();

        app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();

        // create permissions
        Permission::create(['name' => 'edit articles']);
        Permission::create(['name' => 'delete articles']);
        Permission::create(['name' => 'publish articles']);
        Permission::create(['name' => 'unpublish articles']);

        Permission::create(['name' => 'Edit CLP']);

        // create roles and assign created permissions

        // this can be done as separate statements
        $role = Role::create(['name' => 'writer']);
        $role->givePermissionTo('edit articles');

        // or may be done by chaining
        $role = Role::create(['name' => 'moderator'])
            ->givePermissionTo(['publish articles', 'unpublish articles']);

        $role = Role::create(['name' => 'super-admin']);
        $role->givePermissionTo(Permission::all());

        $user = User::where('email','admin@root.com')->first();
        $user->assignRole('super-admin');
    }
}


