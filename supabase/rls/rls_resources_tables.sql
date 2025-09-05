ALTER TABLE services ENABLE ROW LEVEL SECURITY;

CREATE POLICY services_read_policy
ON services
FOR SELECT
USING (
  EXISTS (
    SELECT 1
    FROM user_roles ur
    JOIN role_access ra ON ra.role_id = ur.role_id
    JOIN app_resources r ON r.id = ra.resource_id
    JOIN app_actions a ON a.id = ra.action_id
    JOIN app_scopes s ON s.id = ra.scope_id
    WHERE ur.user_id = auth.uid()
      AND r.code = 'services'
      AND a.code = 'read'
      AND (
        s.code = 'all'
        OR (s.code = 'own' AND services.created_by = auth.uid())
        OR (s.code = 'team' AND services.team_id IN (
              SELECT team_id FROM team_members WHERE user_id = auth.uid()
            ))
      )
  )
);


CREATE POLICY services_create_policy
ON services
FOR INSERT
WITH CHECK (
  EXISTS (
    SELECT 1
    FROM user_roles ur
    JOIN role_access ra ON ra.role_id = ur.role_id
    JOIN app_resources r ON r.id = ra.resource_id
    JOIN app_actions a ON a.id = ra.action_id
    JOIN app_scopes s ON s.id = ra.scope_id
    WHERE ur.user_id = auth.uid()
      AND r.code = 'services'
      AND a.code = 'create'
      AND (
        s.code = 'all'
        OR (s.code = 'own' AND NEW.created_by = auth.uid())
        OR (s.code = 'team' AND NEW.team_id IN (
              SELECT team_id FROM team_members WHERE user_id = auth.uid()
            ))
      )
  )
);


CREATE POLICY services_update_policy
ON services
FOR UPDATE
USING (
  EXISTS (
    SELECT 1
    FROM user_roles ur
    JOIN role_access ra ON ra.role_id = ur.role_id
    JOIN app_resources r ON r.id = ra.resource_id
    JOIN app_actions a ON a.id = ra.action_id
    JOIN app_scopes s ON s.id = ra.scope_id
    WHERE ur.user_id = auth.uid()
      AND r.code = 'services'
      AND a.code = 'update'
      AND (
        s.code = 'all'
        OR (s.code = 'own' AND services.created_by = auth.uid())
        OR (s.code = 'team' AND services.team_id IN (
              SELECT team_id FROM team_members WHERE user_id = auth.uid()
            ))
      )
  )
)
WITH CHECK (
  EXISTS (
    SELECT 1
    FROM user_roles ur
    JOIN role_access ra ON ra.role_id = ur.role_id
    JOIN app_resources r ON r.id = ra.resource_id
    JOIN app_actions a ON a.id = ra.action_id
    JOIN app_scopes s ON s.id = ra.scope_id
    WHERE ur.user_id = auth.uid()
      AND r.code = 'services'
      AND a.code = 'update'
      AND (
        s.code = 'all'
        OR (s.code = 'own' AND NEW.created_by = auth.uid())
        OR (s.code = 'team' AND NEW.team_id IN (
              SELECT team_id FROM team_members WHERE user_id = auth.uid()
            ))
      )
  )
);


CREATE POLICY services_delete_policy
ON services
FOR DELETE
USING (
  EXISTS (
    SELECT 1
    FROM user_roles ur
    JOIN role_access ra ON ra.role_id = ur.role_id
    JOIN app_resources r ON r.id = ra.resource_id
    JOIN app_actions a ON a.id = ra.action_id
    JOIN app_scopes s ON s.id = ra.scope_id
    WHERE ur.user_id = auth.uid()
      AND r.code = 'services'
      AND a.code = 'delete'
      AND (
        s.code = 'all'
        OR (s.code = 'own' AND services.created_by = auth.uid())
        OR (s.code = 'team' AND services.team_id IN (
              SELECT team_id FROM team_members WHERE user_id = auth.uid()
            ))
      )
  )
);
